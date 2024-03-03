import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAPIResponseTransactionStatus } from "../PortfolioSlice";


export const getTransactions = createAsyncThunk(
    'get-transactions',
    async ()=>{
        try{
            const transactions = await fetch("https://kdu-automation.s3.ap-south-1.amazonaws.com/mini-project-apis/portfolio-transactions.json");
            const data:IAPIResponseTransactionStatus[] = await transactions.json();
            return data;
        }
        catch(err){
            throw new Error("There was an error fetching the api: "+err);
        }
    }
)