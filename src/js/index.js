import Search from './models/Search';
import Recipe from './models/Recipe'
import * as searchView from './views/SearchView';
import {elements, renderLoader, clearLoader} from './views/base'

/**
 *  Global State of the app
 */
const state = {};

/** SEARCH CONTROLLER
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const controlSearch = async () => {
    //1. Get query from view
    const query = searchView.getInput()    
    // console.log(query);

    //2. New Search object and add to state
    state.search = new Search(query);
    

    //3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes)    


    //4. Search for recipes
    try{
        await state.search.getResults();

        //5. Render results on UI
        clearLoader()
        searchView.renderRecipes(state.search.recipes) 
    }catch(err){
        console.log("Something went wrong")
        clearLoader()
    }
   
       
}

elements.searchForm.submit(e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.click( e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);        
        searchView.clearResults();
        searchView.renderRecipes(state.search.recipes, goToPage)
    }
});

/** RECIPE CONTROLLER
 * 
 */
const controlRecipe = async () => {
    const id = window.location.hash.replace("#", '');
    console.log(id);
    if(id){
        // 1. Prepare UI for change

        // 2. Create a new Recipe object and add it to state
        state.recipe = new Recipe(id)
        try{
            // 3. Get Recipe Data
        await state.recipe.getRecipe()
        // 4. Calculate the servings and Time
        state.recipe.calcTime()
        state.recipe.calcServings();
        // 5. Render Recipe
        console.log(state.recipe);
        }catch(err){
            alert("Something went wrong! with recipe processing")
            log(err)

        }
        
        
    }
    
}

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe))
