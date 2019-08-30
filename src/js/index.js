import Search from './models/Search';
import * as searchView from './views/SearchView';
import {elements, renderLoader, clearLoader} from './views/base'

/** Global State of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};
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
    await state.search.getResults();

    //5. Render results on UI
    console.log(state.search.recipes);
    clearLoader()
    searchView.renderRecipes(state.search.recipes) 
       
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

