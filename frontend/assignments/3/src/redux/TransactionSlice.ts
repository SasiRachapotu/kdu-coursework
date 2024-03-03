import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ITransaction{
    numberOfStocks:number,
    date:Date,
    type:string,
    stockName:string,
    price:number
}

export interface IRoomTransaction{
    type:string
    numberOfStocks:number,
    stockName:string,
    date:Date,
}
interface ITransactionsTemplate{
    currentTransactions:ITransaction[],
    roomTransactions:IRoomTransaction[],
    initialAmount:number,
    snackBarStatus:boolean,
}

const initialState:ITransactionsTemplate={
    currentTransactions:[],
    roomTransactions:[],
    initialAmount:10000,
    snackBarStatus:false,
}
const TransactionSlice = createSlice({
    name:"transaction slice",
    initialState:initialState,
    reducers:{
        modifySnackBarStatus:(state,action:PayloadAction<boolean>)=>{
            state.snackBarStatus=action.payload;
        },
        modifyCurrentTransaction:(state,action:PayloadAction<ITransaction>)=>{
            state.currentTransactions=[...state.currentTransactions,action.payload]
        },
        modifyRoomTransaction:(state,action:PayloadAction<IRoomTransaction>)=>{
            state.roomTransactions=[...state.roomTransactions,action.payload];
        },
        modifySellInitialAmount:(state,action:PayloadAction<number>)=>{
            state.initialAmount=state.initialAmount+action.payload;
        },
        modifyBuyInitialAmount:(state,action:PayloadAction<number>)=>{
            state.initialAmount=state.initialAmount-action.payload;
        }
    }
})

export const {modifySnackBarStatus,modifyCurrentTransaction,modifyRoomTransaction, modifySellInitialAmount, modifyBuyInitialAmount} = TransactionSlice.actions

export const TransactionSliceReducer = TransactionSlice.reducer;