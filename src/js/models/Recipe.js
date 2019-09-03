import axios from 'axios';
import { key } from '../config';

export default class Recipe{
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title
            this.publisher = res.data.recipe.publisher
            this.img = res.data.recipe.image_url
            this.url = res.data.recipe.source_url
            this.ingredients = res.data.recipe.ingredients
            
        }catch(error){
            console.log(error);
            alert("Something went wrong")
            
        }
    }
    calcTime(){
        //Assume that every 3 ingredents take 15 minutes to cook. 
        //There isn't really any logic here
        const numIng = this.ingredients.length
        this.time = Math.ceil(numIng/3) * 15
    }
    calcServings(){
        //Again no logic. just some random assumptions
        this.servings = 4;

    }
    parseIngredients(){ 
        const unitsLong = ['tablespoon', 'tablespoons', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'cups', 'pound', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'lb', 'lb']

        const newIngredients = this.ingredients.map(el => {
            // 1. Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i])
            })
            // 2. Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, "");
            // 3. Parse ingredients into count, unit and ingredient
        })
    }
}