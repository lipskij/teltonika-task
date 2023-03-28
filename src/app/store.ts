import { configureStore } from "@reduxjs/toolkit";

import categoriesReducer from "./features/categories/categories";
import usersReducer from "./features/users/users";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const categoriesPersistConfig = {
  key: "categories",
  storage,
};

const usersPersistConfig = {
  key: "users",
  storage,
};

const categoriesReducers = persistReducer(
  categoriesPersistConfig,
  categoriesReducer
);

const usersReducers = persistReducer(usersPersistConfig, usersReducer);

const store = configureStore({
  reducer: {
    categories: categoriesReducers,
    users: usersReducers,
  },
  middleware: [],
});

const persistor = persistStore(store);

export { store, persistor };
