import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_URL;

const recorrerArray = (array, propiedad) => {
  const newArray = [];
  if (array) {
    array.forEach((element) => {
      newArray.push(element[propiedad]);
    });
    return newArray;
  }
};

const initialState = {
  filteredProducts: [],
  products: [],
  nikeProducts: [],
  reebokProducts: [],
  adidasProducts: [],

  currentPage: 1,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get(`${URL}/products`);
      const data = response.data;
      // const filteredIsPublished = data.filter((p) => p.isPublish === false)
      // return filteredIsPublished;
       return [...response.data];
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const fetchNikeProducts = createAsyncThunk(
  "products/fetchNikeProducts",
  async () => {
    try {
      const response = await axios.get(`${URL}/products`, {
        params: { brand: "nike" }, // Send the "brand" parameter to filter Nike products
      });
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
      // console.log(actions);
      state.currentPage = actions.payload;
    },
    setFilteredProducts: (state, actions) => {
      state.filteredProducts = actions.payload;
      state.currentPage = 1;
    },
    setFilteredProducts: (state, actions) => {
      const { payload } = actions;
      const brand = "nike";
      state.filteredProducts = payload.filter(
        (product) => product.brand === brand
      );
      state.currentPage = 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.fulfilled, (state, actions) => {
        // console.log(actions.payload);
        if (!state.products.length) {
          actions.payload.forEach((element) => {
            const sizes = recorrerArray(element.sizes, "size");
            state.products.push({ ...element, sizes });
          });
        }
        if (!state.filteredProducts.length) {
          actions.payload.forEach((element) => {
            const sizes = recorrerArray(element.sizes, "size");
            state.filteredProducts.push({ ...element, sizes });
          });
        }
      })
      .addCase(fetchProducts.rejected, (state, actions) => {
        console.log(actions.error.message);
      })
      .addCase(fetchNikeProducts.fulfilled, (state, actions) => {
        state.nikeProducts = actions.payload.map((element) => {
          const sizes = recorrerArray(element.sizes, "size");
          return { ...element, sizes };
        });
      })
      .addCase(fetchNikeProducts.rejected, (state, actions) => {
        console.log(actions.error.message);
      });
  },
});

export const getAllProducts = (state) => state.products.products;
export const getCurrentPage = (state) => state.products.currentPage;
export const getfilteredProducts = (state) => state.products.filteredProducts;

export const { setCurrentPage, setFilteredProducts } = productsSlice.actions;
export default productsSlice.reducer;
