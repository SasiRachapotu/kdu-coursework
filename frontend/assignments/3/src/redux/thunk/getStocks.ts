import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAPIResponse } from "../../interface/ApiResponse";

export const getStocks = createAsyncThunk(
    'get-stocks',
    async ()=>{
        try{
            const stocks = await fetch("https://kdu-automation.s3.ap-south-1.amazonaws.com/mini-project-apis/stocks.json");
            const data:IAPIResponse[] = await stocks.json();
            return data;
        }
        catch(err){
            throw new Error("There was an error in fetching an api: "+err);
        }
    }
)