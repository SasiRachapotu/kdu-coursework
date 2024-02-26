import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ITemplate {
    id: string;
    text: string;
    checked:boolean
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
        },
        addItem:(state,action:PayloadAction<ITemplate>)=>{
          state.items=[...state.items,action.payload]
        },
        removeItem:(state,action:PayloadAction<string>)=>{
          state.items=state.items.filter((item)=>item.id!==action.payload)
        },
        removeCheckedItems:(state)=>{
          state.items=state.items.filter((item)=>item.checked!==true);
        },
        toggleChecked:(state,action:PayloadAction<string>)=>{
          state.items=state.items.map((item)=>item.id===action.payload?{...item,checked:!item.checked}:item);
        }
    }
})

export const {changeItems, addItem, removeItem, removeCheckedItems,toggleChecked} = itemSlice.actions

export const itemsReducer = itemSlice.reducer;