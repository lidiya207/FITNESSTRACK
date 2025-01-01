import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import storage from "redux-persist/lib/storage"; // Import storage from redux-persist
import userReducer from "./userSlice"; // Ensure the file name and path are correct

// Persist configuration
const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

// Root reducer combining all slices
const rootReducer = combineReducers({
    user: userReducer,
});

// Wrapping the root reducer with persistence capabilities
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store configuration
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER, PURGE],
            },
        }),
});

// Create a persistor linked to the store
export const persistor = persistStore(store);
