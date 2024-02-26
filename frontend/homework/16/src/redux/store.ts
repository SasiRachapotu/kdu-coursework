import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "./SearchSlice";
import { itemsReducer } from "./ItemsSlice";

export const store = configureStore({
    reducer:{
        search:searchReducer,
        items:itemsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>