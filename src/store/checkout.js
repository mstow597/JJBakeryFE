import { createSlice } from "@reduxjs/toolkit";

const checkoutInitialState = {
  checkoutAsGuest: false,
  paymentTypeSelected: false,
  paymentType: "",
  zipValue: "",
  phoneValue: "",
  nameValue: "",
  nameValueChanged: false,
  phoneValueChanged: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: checkoutInitialState,
  reducers: {
    checkoutAsGuest(state) {
      state.checkoutAsGuest = true;
    },
    checkoutAsUser(state) {
      state.checkoutAsGuest = false;
    },
    setPaymentType(state, action) {
      state.paymentTypeSelected = true;
      state.paymentType = action.payload;
    },
    setZipValue(state, action) {
      state.zipValue = action.payload;
    },
    setPhoneValue(state, action) {
      state.phoneValueChanged = true;
      state.phoneValue = action.payload;
    },
    setNameValue(state, action) {
      state.nameValueChanged = true;
      state.nameValue = action.payload;
    },
  },
});

export const checkoutActions = checkoutSlice.actions;
export default checkoutSlice.reducer;
