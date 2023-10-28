import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getBrands = createAsyncThunk("createSlice/getBrands", async () => {
  let { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/brands"
  );
  return data.data;
});

let initialState = { brands: [], loading: false, isError: null };
let brandSlice = createSlice({
  name: "brandSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.brands = action.payload;
      state.loading = false;
    });
    builder.addCase(getBrands.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getBrands.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export let brandsReducer = brandSlice.reducer;
