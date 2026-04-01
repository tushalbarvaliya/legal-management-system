import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"

import storage from "redux-persist/lib/storage"
import authReducer from "./slice/authSlice"
import { companyAPI } from "./services/companyAPI"

const rootReducer = combineReducers({
  auth: authReducer,
  [companyAPI.reducerPath]: companyAPI.reducer,
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(companyAPI.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
