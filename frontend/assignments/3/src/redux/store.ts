import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { stockSliceReducer } from "./StockSlice";
import storageSession from 'redux-persist/lib/storage/session'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import { TransactionSliceReducer } from "./TransactionSlice";
import { portfolioSliceReducer } from "./PortfolioSlice";
import { SummarizerReducer } from "./SummarizerSlice";


const persistConfig = {
    key: 'root',
    storage:storageSession,
  }

  const rootReducer = combineReducers({ 
    stocks:stockSliceReducer,
    transactions:TransactionSliceReducer,
    portfolio:portfolioSliceReducer,
    summarizer:SummarizerReducer,
  })

  const persistedReducer = persistReducer(persistConfig,rootReducer);

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

export type itemsDispatch = typeof store.dispatch;