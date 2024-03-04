import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "./SearchSlice";
import storageSession from 'redux-persist/lib/storage/session'
import { itemsReducer } from "./ItemsSlice";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage:storageSession,
  }

  const rootReducer = combineReducers({ 
    search:searchReducer,
    items:itemsReducer
  })

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewareConfig = {
  serializableCheck: {
    ignoredPaths: ['searchSlice', 'itemSlice.items'],
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
};

export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(middlewareConfig),
})

export type RootState = ReturnType<typeof store.getState>