import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { cartId: "", items: [], totalCost: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    setCart(state, action) {
      console.log(action);
      state.cartId = action.payload.id;
      state.items = action.payload.items;
      state.totalCost = action.payload.items.reduce((accumulator, item) => {
        accumulator += item.pricePerOrder * item.orderAmount;
        return accumulator;
      }, 0);
    },
    addItem(state, action) {
      state.totalCost += action.payload.orderAmount * action.payload.pricePerOrder;

      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].orderAmount += action.payload.orderAmount;
      } else {
        state.items = state.items.concat(action.payload);
      }
    },
    decreaseItemAmount(state, action) {
      const item = state.items.find((item) => item.id === action.payload.id);
      item.orderAmount -= 1;
      state.totalCost -= item.pricePerOrder;
    },
    removeItem(state, action) {
      const { orderAmount, pricePerOrder } = state.items.find((item) => item.id === action.payload.id);

      if (state.items.length === 1) state.totalCost = 0;
      else state.totalCost -= orderAmount * pricePerOrder;

      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    emptyCart(state) {
      state.cartId = "";
      state.items = [];
      state.totalCost = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
