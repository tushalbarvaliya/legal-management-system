import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"

import storage from "redux-persist/lib/storage"
import authReducer from "./slice/authSlice"
import { companyAPI } from "./services/companyAPI"
import { lawyerAPI } from "./services/lawyerAPI"
import { adminAPI } from "./services/adminAPI"
import { profileAPI } from "./services/profileAPI"
import { sessionAPI } from "./services/sessionAPI"
import { clientAPI } from "./services/clientAPI"
import { caseAPI } from "./services/caseAPI"
import { taskAPI } from "./services/taskAPI"
import { staffAPI } from "./services/staffAPI"
import { invoiceAPI } from "./services/invoiceAPI"

const rootReducer = combineReducers({
  auth: authReducer,
  [companyAPI.reducerPath]: companyAPI.reducer,
  [lawyerAPI.reducerPath]: lawyerAPI.reducer,
  [adminAPI.reducerPath]: adminAPI.reducer,
  [profileAPI.reducerPath]: profileAPI.reducer,
  [sessionAPI.reducerPath]: sessionAPI.reducer,
  [caseAPI.reducerPath]: caseAPI.reducer,
  [taskAPI.reducerPath]: taskAPI.reducer,
  [staffAPI.reducerPath]: staffAPI.reducer,
  [invoiceAPI.reducerPath]: invoiceAPI.reducer,
  [clientAPI.reducerPath]: clientAPI.reducer,
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
    })
      .concat(companyAPI.middleware)
      .concat(lawyerAPI.middleware)
      .concat(adminAPI.middleware)
      .concat(profileAPI.middleware)
      .concat(invoiceAPI.middleware)
      .concat(caseAPI.middleware)
      .concat(clientAPI.middleware)
      .concat(taskAPI.middleware)
      .concat(staffAPI.middleware)
      .concat(sessionAPI.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
