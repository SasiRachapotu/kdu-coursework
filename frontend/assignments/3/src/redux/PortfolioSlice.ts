import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getTransactions } from "./thunk/getTransaction";

export interface IAPIResponseTransactionStatus {
    stock_name:        string;
    stock_symbol:      string;
    transaction_price: number;
    timestamp:         string;
    status:            string;
}

export interface IParsedResponse{
    stock_name:        string;
    stock_symbol:      string;
    transaction_price: number;
    timestamp:         Date;
    status:            string;
}

interface IPortfolioTemplate{
    transactions:IAPIResponseTransactionStatus[],
    parsedTransactions:IParsedResponse[],
    groupedTransaction:{ [date: string]: IParsedResponse[] },
    statusList:string[],
    filterStocksList:string[],
    startDate:Date,
    endDate:Date,
    filterInput:string,
    dateFilter:boolean
}

const initialState:IPortfolioTemplate={
    transactions:[],
    parsedTransactions:[],
    groupedTransaction:{},
    statusList:[],
    filterStocksList:[],
    startDate:new Date(),
    endDate:new Date(),
    filterInput:"",
    dateFilter:false
}
const getPortfolioSlice = createSlice({
    name:"portfolio-slice",
    initialState:initialState,
    reducers:{
        modifyStartDate:(state,action:PayloadAction<Date>)=>{
            state.startDate=action.payload;
        },
        modifyEndDate:(state,action:PayloadAction<Date>)=>{
            state.endDate=action.payload;
        },
        modifyStatusList:(state,action:PayloadAction<string>)=>{
           if(state.statusList.includes(action.payload)){
            state.statusList=state.statusList.filter((status)=>status!==action.payload);
           }
           else{
            state.statusList=[...state.statusList,action.payload];
           }
        },
        modifyFilterStockList:(state,action:PayloadAction<string>)=>{
           if(state.filterStocksList.includes(action.payload)){
            state.filterStocksList=state.filterStocksList.filter((status)=>status!==action.payload);
           }
           else{
            state.filterStocksList=[...state.filterStocksList,action.payload];
           }
        },
        modifyFilterInput:(state,action:PayloadAction<string>)=>{
            state.filterInput=action.payload;
        },
        modifyDateFilter:(state,action:PayloadAction<boolean>)=>{
            state.dateFilter=action.payload;
        },
        clearAllFilter:(state)=>{
            state.filterInput="";
            state.filterStocksList=[];
            state.startDate=new Date();
            state.endDate=new Date();
            state.statusList=[];
            state.dateFilter=false;
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(getTransactions.fulfilled,(state,action)=>{
            state.transactions=action.payload;
            state.parsedTransactions=action.payload.map((transaction) => ({
                ...transaction,
                timestamp: new Date(transaction.timestamp),
            }));      
            state.parsedTransactions.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());  
            state.groupedTransaction = state.parsedTransactions.reduce((grouped, transaction) => {
                const dateKey = transaction.timestamp.toISOString().split('T')[0];

                if (!grouped[dateKey]) {
                    grouped[dateKey] = [];
                }

                grouped[dateKey].push(transaction);
                return grouped;
            }, {});
                  
            console.log(state.groupedTransaction);
        })
    }
})

export const {modifyStartDate,modifyEndDate,modifyStatusList,modifyFilterStockList,modifyFilterInput,clearAllFilter,modifyDateFilter} = getPortfolioSlice.actions;


export const portfolioSliceReducer = getPortfolioSlice.reducer;