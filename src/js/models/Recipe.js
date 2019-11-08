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
        let objIng;
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'pound'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'lb', 'lb']
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            // 1. Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i])
            })
            // 2. Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            // 3. Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el => units.includes(el));

            if(unitIndex > -1){
                //There is a unit
                //Ex 4 1/2 cups, arrCount is  [4, 1/2] and 
                //Ex 4 cups, arrCount is [4]

                const arrCount = arrIng.slice(0, unitIndex);
                let count;

                if (arrCount.length === 1) {
                    //the + sign drops extra zeroes at the end thus the decimal part is only returned if necessary
                    count = +eval(arrIng[0].replace('-', '+')).toFixed(2);

                } else {
                    count = +eval(arrIng.slice(0, unitIndex).join('+')).toFixed(2);
                }
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')

                }
            }else if (parseInt(arrIng[0], 10)){
                //There is no unit but first element is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                //There is no unit and no number
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            } 
            return objIng;
        });
        this.ingredients = newIngredients;
    }
}