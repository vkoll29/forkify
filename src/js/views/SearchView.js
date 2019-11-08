import {elements} from './base'

export const getInput = () => elements.searchInput.val();
export const clearInput = () => {elements.searchInput.val('')}
export const clearResults = () => {
    elements.searchResList.html('');
    elements.searchResPages.html('');
}

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')} ...`
    }
    return title
}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
         </li>
         `;
    elements.searchResList.append(markup);
}

const createButton = (page, type) => 
        `
            <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
                <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                </svg>
            </button>
        `
const renderButton = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button
    if(page === 1 && pages > 1){
        // Rnder next button only
        button = createButton(page, 'next')
    } else if(page < pages){
        //Render both back and next buttons
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `
    } else if (page === pages && pages > 1 ){
        //Render back button only
        button = createButton(page, 'prev')
    }

    elements.searchResPages.append(button);
}

export const renderRecipes = (recipes, page = 1, resPerPage = 5) => {
    //render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    //render pagination buttons
    renderButton(page, recipes.length, resPerPage)
} 