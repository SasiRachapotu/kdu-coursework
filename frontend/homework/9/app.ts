interface IRecipeFetchBody {
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
const rawRecepies:IRecipeFetchBody[]=[];

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

let prettierResponse:IRecipeResponse[]=[];


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


async function printAllRecipes(apiResponse:IRecipeFetchBody[]):Promise<IRecipeResponse[]>{
    prettierResponse=[];
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

    return new Promise((resolve,reject)=>{
        try{
            resolve(prettierResponse);
        }
        catch(err){
            reject(err);
        }
    }) 
}

async function searchRecipes(query:string|undefined):Promise<IRecipeFetchBody[]>{
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


let itemContainer:HTMLDivElement | null = document.querySelector(".items-container");

function addToContainer(response:IRecipeResponse[]){
    response.forEach((x)=>{
        let itemDiv:HTMLDivElement = document.createElement("div");
        itemDiv.classList.add("item-div");
        let rating:HTMLDivElement = document.createElement("div");
        rating.classList.add("rating");
        rating.innerText=x.rating.toString();
        let imageContainer:HTMLDivElement = document.createElement("div");
        itemDiv.appendChild(rating);
        imageContainer.classList.add("image-container");

        let image:HTMLImageElement = document.createElement("img");
        image.src=x.image;

        imageContainer.appendChild(image);

        itemDiv.appendChild(imageContainer);

        let foodItemName:HTMLDivElement = document.createElement("div");
        foodItemName.classList.add("food-item-name");
        foodItemName.innerText=x.name;

        itemDiv.appendChild(foodItemName);

        let ingredients:HTMLDivElement = document.createElement("div");
        ingredients.classList.add("ingredients");
        ingredients.innerText=`Ingredients: ${x.ingredients.toString()}`;

        itemDiv.appendChild(ingredients);


        let cuisineDifficulty:HTMLDivElement = document.createElement("div");
        cuisineDifficulty.classList.add("cuisine-difficulty");

        let cuisine:HTMLDivElement = document.createElement("div");
        cuisine.classList.add("cuisine");
        cuisine.innerText=`Cuisine: ${x.cuisine}`;
        let difficulty:HTMLDivElement = document.createElement("div");
        difficulty.classList.add("difficulty");
        difficulty.innerText=`Difficulty: ${x.difficulty}`;

        cuisineDifficulty.appendChild(cuisine);
        cuisineDifficulty.appendChild(difficulty);

        itemDiv.appendChild(cuisineDifficulty)
        
        let timeTakenCal:HTMLDivElement = document.createElement("div");
        timeTakenCal.classList.add("time-taken-x-calories")


        let timeTaken:HTMLDivElement = document.createElement("div");
        timeTaken.classList.add("time-taken")
        timeTaken.innerText=`Time taken: ${x.timeTaken.toString()}`;
        let calories:HTMLDivElement = document.createElement("div");
        calories.classList.add("calories");
        calories.innerText=`Calories: ${x.calorieCount.toString()}`;

        timeTakenCal.appendChild(timeTaken);
        timeTakenCal.appendChild(calories);

        itemDiv.appendChild(timeTakenCal);
        itemContainer?.appendChild(itemDiv)

    })
}

(async()=>{
    let apiResponse:IRecipeFetchBody[] =await fetchRecipesFromAPI()
    console.log("Data for fetching all the documents: ");
    let prettierResponse:IRecipeResponse[] = await printAllRecipes(apiResponse);
    addToContainer(prettierResponse)
    
})();


let searchbar:HTMLInputElement | null = document.getElementById("search-bar") as HTMLInputElement
let searchbtn:HTMLElement | null = document.getElementById("search");

searchbtn?.addEventListener("click", (e): void => {
    itemContainer!.innerHTML = "";
    let value: string | undefined = searchbar?.value;
    searchRecipes(value)
        .then(apiResponse => {
            console.log("The response of the search query: ");
            return printAllRecipes(apiResponse);
        })
        .then(prettierResponse => {
            addToContainer(prettierResponse);
        })
        .catch(error => {
            console.error("Error:", error);
        });
});








