import { configureStore } from "@reduxjs/toolkit";
import { itemSliceReducer } from "./ItemSlice";
import { enableMapSet } from 'immer';

enableMapSet();

export const store  = configureStore({
    reducer:{
        items:itemSliceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type itemsDispatch = typeof store.dispatch;