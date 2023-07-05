import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const GET_URL = "http://localhost:3001/products";

const recorrerArray = (array, propiedad) => {
  const newArray = [];
  array.forEach((element) => {
    newArray.push(element[propiedad]);
  });
  return newArray;
};

const initialState = {
  products: [],
  currentPage: 1,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get(GET_URL);
      return [...response.data];
    } catch (error) {
      return error.message;
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage: (state, actions) => {
      console.log(actions);
      state.currentPage = actions.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.fulfilled, (state, actions) => {
        actions.payload.forEach((element) => {
          const categories = recorrerArray(element.categories, "name");
          const colors = recorrerArray(element.colors, "color");
          const images = recorrerArray(element.images, "imageUrl");
          const sizes = recorrerArray(element.sizes, "size");
          state.products.push({
            ...element,
            categories,
            colors,
            images,
            sizes,
          });
        });
      })
      .addCase(fetchProducts.rejected, (state, actions) => {
        console.log(actions.error.message);
      });
  },
});
export const getAllProducts = (state) => state.products.products;
export const getCurrentPage = (state) => state.products.currentPage;
export const { setCurrentPage } = productsSlice.actions;
export default productsSlice.reducer;
