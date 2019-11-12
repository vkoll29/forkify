import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import {elements, renderLoader, clearLoader} from './views/base'
import jquery from 'jquery';

const $ = jquery;

/**
 *  Global State of the app
 */
const state = {};
window.s = state;
/** SEARCH CONTROLLER
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const controlSearch = async () => {
    //1. Get query from view
    const query = searchView.getInput();

    //2. New Search object and add to state
    state.search = new Search(query);
    

    //3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes)    


    //4. Search for recipes
    try {
        await state.search.getResults();

        //5. Render results on UI
        clearLoader()
        searchView.renderRecipes(state.search.recipes) 
    }catch(err){
        console.log(err)
        clearLoader()
    }
}

elements.searchForm.submit(e => {
    e.preventDefault();
    controlSearch();
});

//Pagination buttons
elements.searchResPages.click( e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);        
        searchView.clearResults();
        searchView.renderRecipes(state.search.recipes, goToPage)
    }
});

/** 
 * RECIPE CONTROLLER
 * 
 */
const controlRecipe = async () => {
    const id = window.location.hash.replace("#", '');
    
    if(id){
        // 1. Prepare UI for change
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight selected recipe
        if (state.searchView) searchView.highlightSelected(id);
        // 2. Create a new Recipe object and add it to state
        state.recipe = new Recipe(id);
        try{
            // 3. Get Recipe Data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            // 4. Calculate the servings and Time
            state.recipe.calcTime()
            state.recipe.calcServings();
            // 5. Render Recipe
            
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        }catch(err){
            alert("Something went wrong with recipe processing")
            console.log(err)

        }
        
        
    }
    
}

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe))

/**
 * LIST CONTROLLER
 */

const controlList = () => {
    // Create a new list IF there in none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

//Handle delete and update list item events
elements.shopping.click(e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    //Handle delete
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        //Delete from state
        state.list.deleteItem(id);
        //Delete from view

        listView.deleteItem(id);
        //Handle update count
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }

    

})

//Recipe button clicks
elements.recipe.click(e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateUIServings(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateUIServings(state.recipe)
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    } else {
        console.log("fick");
        
    }

        
})

window.l = new List;