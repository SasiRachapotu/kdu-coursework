import { configureStore } from "@reduxjs/toolkit";
import { roomSliceReducer } from "./RoomsSlice";


export const store = configureStore({
    reducer:{
        rooms:roomSliceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type itemsDispatch = typeof store.dispatch;