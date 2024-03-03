import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAPITransactionSummary } from "../interface/ApiResponse";
import { getSummarizedTransactions } from "./thunk/getSummarizedTransactions";
import { ISummarizedStock } from "../worker";

interface ISummarizerTemplate{
    summaryTransactions:IAPITransactionSummary[]
    summary:ISummarizedStock[]
}

const initialState:ISummarizerTemplate={
    summaryTransactions:[],
    summary:[]
}

const SummarizerSlice = createSlice({
    name:"summarizer slice",
    initialState:initialState,
    reducers:{
        setSummary:(state,action:PayloadAction<ISummarizedStock[]>)=>{
            state.summary=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getSummarizedTransactions.fulfilled,(state,action)=>{
            state.summaryTransactions=action.payload;
            console.log(state.summaryTransactions);
        })
        builder.addCase(getSummarizedTransactions.rejected,()=>{
            console.log("error failed");
        })
    }
})

export const {setSummary} = SummarizerSlice.actions

export const SummarizerReducer = SummarizerSlice.reducer;
