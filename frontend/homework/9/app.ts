import { rawRecepies } from "./data/recepies";

export interface IRecipeFetchBody {
    id:number;
    name:string;
    ingredients: string[];
    instructions:string[];
    prepTimeMinutes:number;
    cookTimeMinutes:number;
    serving:number;
    difficulty:string;
    cuisine:string;
    caloriesPerServing:number;
    tags:string[];
    userId:number;
    image:string;
    rating:number;
    reviewCount:number;
    mealType:string[];
}

interface IRecipeResponse{
    image:string;
    name:string;
    rating:number;
    cuisine:string;
    ingredients: string[];
    difficulty:string;
    timeTaken:number;
    calorieCount:number;
}

const prettierResponse:IRecipeResponse[]=[];


async function fetchRecipesFromAPI():Promise<IRecipeFetchBody[]>{
    rawRecepies.splice(0,rawRecepies.length);
    const res:any = await fetch("https://dummyjson.com/recipes");
    const data:any = await res.json();
    const parsedData: IRecipeFetchBody[]=data.recipes;
    parsedData.forEach((data)=>{
        rawRecepies.push(data);
    })
    return new Promise((resolve,reject)=>{
        try{
            resolve(rawRecepies);
        }
        catch(err){
            reject(err);
        }
    }) 
}



async function printAllRecipes(apiResponse:IRecipeFetchBody[]){
    apiResponse.forEach((element)=>{
        let prettyReciepe:IRecipeResponse={
            image:element.image,
            name:element.name,
            rating:element.rating,
            cuisine:element.cuisine,
            ingredients: element.ingredients,
            difficulty:element.difficulty,
            timeTaken:element.prepTimeMinutes+element.cookTimeMinutes,
            calorieCount:element.caloriesPerServing
        }

        prettierResponse.push(prettyReciepe);
    })

    console.log(prettierResponse);
}

async function searchRecipes(query:string):Promise<IRecipeFetchBody[]>{
    rawRecepies.splice(0,rawRecepies.length);
    const res:any = await fetch("https://dummyjson.com/recipes/search?q="+query);
    let data:any = await res.json();

    const parsedData:IRecipeFetchBody[]= data.recipes;
    parsedData.forEach((data)=>{
        rawRecepies.push(data);
    })
    return new Promise((resolve,reject)=>{
        try{
            resolve(rawRecepies);
        }
        catch(err){
            reject(err);
        }
    })
}

(async()=>{
    let apiResponse:IRecipeFetchBody[] =await fetchRecipesFromAPI()
    console.log("Data for fetching all the documents: ====================");
    printAllRecipes(apiResponse);
    apiResponse = await searchRecipes("dosa");
    console.log("The response of the search query: ");
    printAllRecipes(apiResponse);
})();



