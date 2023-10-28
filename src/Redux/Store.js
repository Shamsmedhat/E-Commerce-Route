import { configureStore } from "@reduxjs/toolkit";
import { categoriesReducer } from "./CategoriesSlice";
import { brandsReducer } from "./BrandSlice";
import { productReducer } from "./productSlice";

export let store = configureStore({
  reducer: {
    categories: categoriesReducer,
    brands: brandsReducer,
    product: productReducer,
  },
});
