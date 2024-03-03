import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAPITransactionSummary } from "../../interface/ApiResponse";


export const getSummarizedTransactions = createAsyncThunk(
    'get-summarized-transactions',
    async ()=>{
        try{
            const stocks = await fetch("https://kdu-automation.s3.ap-south-1.amazonaws.com/mini-project-apis/all-stocks-transactions.json");
            const data:IAPITransactionSummary[] = await stocks.json();
            return data;
        }
        catch(err){
            throw new Error("There was an error in fetching an api: "+err);
        }
    }
)
