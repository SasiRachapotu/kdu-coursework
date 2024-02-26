import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ITemplate {
    id: number;
    text: string;
  }

  interface IItemsTemplate{
    items:ITemplate[];
  }

  const initialState:IItemsTemplate={
    items:[],
  }

const itemSlice = createSlice({
    name:"itemSlice",
    initialState:initialState,
    reducers:{
        changeItems:(state,action:PayloadAction<ITemplate[]>)=>{
            state.items=action.payload;
        }
    }
})

export const {changeItems} = itemSlice.actions

export const itemsReducer = itemSlice.reducer;