import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";
import slotReducer from "./features/slotSlice/slotSlice"; // Import the slotSlice reducer
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist configuration for auth reducer
const persistConfig = {
  key: "auth",
  storage,
};

// Persist the auth reducer
const persistAuthReducer = persistReducer(persistConfig, authReducer);

// Create the store and add the reducers
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, // Add baseApi reducer
    auth: persistAuthReducer, // Persisted auth reducer
    slot: slotReducer, // Slot reducer to manage slot state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore specific redux-persist actions
      },
    }).concat(baseApi.middleware), // Concatenate API middleware
});

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export persistor to persist the store
export const persistor = persistStore(store);
