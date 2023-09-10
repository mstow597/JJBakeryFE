import { createSlice } from "@reduxjs/toolkit";

const initialReceiptSlice = {
  orderId: "",
  products: [],
  purchasePrice: 0,
  orderPaid: false,
  subtotal: 0,
  taxes: 0,
};
const receiptSlice = createSlice({
  name: "receipt",
  initialState: initialReceiptSlice,
  reducers: {
    setReceipt(state, action) {
      state.orderId = action.payload._id;
      state.products = action.payload.products;
      state.purchasePrice = action.payload.purchasePrice;
      state.orderPaid = action.payload.orderPaid;
      state.subtotal = action.payload.subtotal;
      state.taxes = action.payload.taxes;
    },
  },
});

export default receiptSlice.reducer;
export const receiptActions = receiptSlice.actions;
