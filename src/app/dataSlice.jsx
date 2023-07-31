import { createSlice } from "@reduxjs/toolkit";
import DataJson from "./clothes.json";

const initialState = DataJson;

export const dataSlice = createSlice({
  name: "dataClothes",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.value = action.payload;
    },
    updateProduct: (state, action) => {
      const { id, qty, totalPrice } = action.payload;
      const findData = state.find((user) => user.id === id);
      findData.qty = qty;
      findData.totalPrice = totalPrice;
    },
  },
});
export const { getData, updateProduct } = dataSlice.actions;

export default dataSlice.reducer;
