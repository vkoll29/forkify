import jquery from 'jquery';
const $ = jquery;

export const elements = {
    searchForm: $('.search'),
    searchInput: $('.search__field'),
    searchResList: $('.results__list'),
    searchRes: $('.results')
}

const elementStrings = {
    loader: "loader"
}

export const renderLoader = parent => {
    const loader = 
    `
    <div class=${elementStrings.loader}>
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
    parent.prepend(loader);
}

export const clearLoader = () => {
    const loader = $(`.${elementStrings.loader}`)
    if(loader){
        loader.remove();
    }
}