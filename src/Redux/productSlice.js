import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getProducts = createAsyncThunk(
  "productSlice/getProducts",
  async () => {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    return data.data;
  }
);

let initialState = { products: [], loading: false, isError: null };

let productSlice = createSlice({
  name: "productSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(getProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export let productReducer = productSlice.reducer;
