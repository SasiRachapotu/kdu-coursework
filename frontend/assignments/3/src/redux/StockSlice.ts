import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAPIResponse } from "../interface/ApiResponse";
import { getStocks } from "./thunk/getStocks";
interface IStocksTemplate{
    stocks:IAPIResponse[];
    exploreState:string;
    exploreStocks:string[];
}

const initialState:IStocksTemplate={
    stocks:[],
    exploreState:"explore",
    exploreStocks:[],
}
const getStockSlice = createSlice({
    name:"stockslice",
    initialState:initialState,
    reducers:{
        modifyitemList:(state,action:PayloadAction<IAPIResponse[]>)=>{
            state.stocks=action.payload;
        },
        modifyExploreState:(state,action:PayloadAction<string>)=>{
            state.exploreState=action.payload;
        },
        modifyExploreStock:(state,action:PayloadAction<string>)=>{
            if(state.exploreStocks.includes(action.payload)){
                state.exploreStocks= state.exploreStocks.filter((stock)=>stock!==action.payload);
            }
            else{
                state.exploreStocks= [...state.exploreStocks,action.payload]
            }
            console.log(state.exploreStocks);
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getStocks.fulfilled,(state,action)=>{
            state.stocks=action.payload;
            console.log(state.stocks);
        })
    }
})

export const {modifyitemList,modifyExploreState,modifyExploreStock} = getStockSlice.actions

export const stockSliceReducer = getStockSlice.reducer;