import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAPIResponse } from "../../interfaces/Interface";

export const getProducts = createAsyncThunk(
    'get-products',
    async ()=>{
        try{
        const posts = await fetch("https://fakestoreapi.com/products");
        const data:IAPIResponse[] = await posts.json();
        return data;
        }
        catch(err){
            throw new Error("The api was not fetched properly"+err);
        }
    }
)