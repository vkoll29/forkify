import axios from 'axios';

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults(){
        const key = "2a32365395e1123f8fa8b0fbca2cf1f4";
        try{
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);            
            this.recipes = res.data.recipes;
            // console.log(this.recipes);
            
        }catch(error){
            console.log(error);
            
        }
    }
}