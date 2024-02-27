import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface ISearchState{
    search:string
}

const initialState:ISearchState={
    search:"",
}
const serachSlice = createSlice({
    name:"searchSlice",
    initialState:initialState,
    reducers:{
        changeSearch:(state,action:PayloadAction<string>)=>{
            state.search=action.payload;
        }
    }
})

export const {changeSearch} = serachSlice.actions;

export const searchReducer = serachSlice.reducer;