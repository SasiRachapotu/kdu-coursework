import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAPIResponse } from "../interfaces/Interface";
import { getProducts } from "./thunk/getProducts";

interface IItemsTemplate{
    items:IAPIResponse[];
    filters:Set<string>;
    currentFilter:string;
    filterItems: IAPIResponse[];
    sort: string;
    search: string;
    searchItems: IAPIResponse[];
    state:string,
    errorMessage:string,
    snackBarStatus:boolean
}

const initialState:IItemsTemplate={
    items: [],
    filters: new Set(),
    currentFilter: "",
    filterItems: [],
    sort: "",
    search: "",
    searchItems: [],
    state:"pending",
    errorMessage:"",
    snackBarStatus:false
}
const itemSlice = createSlice({
    name:"itemslice",
    initialState:initialState,
    reducers:{
        modifyItemList:(state,action:PayloadAction<IAPIResponse[]>)=>{
            state.items=action.payload;
        },
        setCurrentFilterFunction: (state,action:PayloadAction<string>) => {
            state.currentFilter=action.payload
        },
        setFilterItemsFunction: (state,action:PayloadAction<IAPIResponse[]>) => {
            state.filterItems=action.payload;
        },
        setSortFunction: (state,action:PayloadAction<string>) => {
            state.sort=action.payload;
        },
        setSearchFunction: (state, action:PayloadAction<string>) => {
            state.search= action.payload;
        },
        setSearchItemsFunction: (state,action:PayloadAction<IAPIResponse[]>) => {
            state.searchItems=action.payload;
        },
        addFilterToFilters:(state,action:PayloadAction<string>)=>{
            state.filters.add(action.payload)
        },
        setSnackBarStatus:(state,action:PayloadAction<boolean>)=>{
            state.snackBarStatus=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getProducts.fulfilled,(state,action)=>{
            state.items=action.payload;
            state.filterItems=action.payload
            console.log(state.filterItems);
            action.payload.forEach((res) => {
                state.filters.add(res.category)
              });
              state.state="fulfilled"
              state.snackBarStatus=true;
        })
        builder.addCase(getProducts.pending,(state)=>{
            state.state="pending";
        })
        builder.addCase(getProducts.rejected,(state,action)=>{
            state.state="rejected";
            state.errorMessage = action.error.message ?? "Some error occurred in fetching the API";
            state.snackBarStatus=true;
        })
    }
})

export const {modifyItemList,setCurrentFilterFunction,setFilterItemsFunction,setSortFunction,setSearchFunction,setSearchItemsFunction, addFilterToFilters,setSnackBarStatus} = itemSlice.actions
export const itemSliceReducer = itemSlice.reducer;