import { createSlice } from "@reduxjs/toolkit";

const initialUIState = {
  showLoginModal: false,
  showSignupModal: false,
  showSignupSuccessModal: false,
  showCartModal: false,
  showCheckoutModal: false,
  showReceiptModal: false,
  showItemAddedSuccess: false,
  showOrderLimitExceededModal: false,
  showForgotPassModal: false,
  showEmailVerModal: false,
  showSectionHero: true,
  showSectionOrder: false,
  showSectionTestimonials: false,
  showSectionContact: false,
  showContactSuccessModal: false,
  showSectionAccount: false,
  orderedItem: {},
  orderAmount: 0,
};

const setAllFalse = (state) => {
  state.showLoginModal = false;
  state.showSignupModal = false;
  state.showSignupSuccessModal = false;
  state.showCartModal = false;
  state.showCheckoutModal = false;
  state.showReceiptModal = false;
  state.showItemAddedSuccess = false;
  state.showOrderLimitExceededModal = false;
  state.showForgotPassModal = false;
  state.showEmailVerModal = false;
  state.showSectionHero = false;
  state.showSectionOrder = false;
  state.showSectionTestimonials = false;
  state.showSectionContact = false;
  state.showSectionAccount = false;
  state.showContactSuccessModal = false;
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUIState,
  reducers: {
    showLogin(state) {
      state.showLoginModal = true;
      state.showCheckoutModal = false;
    },
    closeLogin(state) {
      state.showLoginModal = false;
    },
    showSignup(state) {
      state.showLoginModal = false;
      state.showSignupModal = true;
    },
    closeSignup(state) {
      state.showSignupModal = false;
    },
    showSignupSuccess(state) {
      state.showSignupSuccessModal = true;
      state.showSignupModal = false;
    },
    closeSignupSuccess(state) {
      state.showSignupSuccessModal = false;
    },
    showCart(state) {
      state.showCartModal = true;
    },
    closeCart(state) {
      state.showCartModal = false;
    },
    showCheckout(state) {
      state.showCheckoutModal = true;
      state.showCartModal = false;
    },
    closeCheckout(state) {
      state.showCheckoutModal = false;
    },
    showReceipt(state) {
      state.showCheckoutModal = false;
      state.showReceiptModal = true;
    },
    closeReceipt(state) {
      state.showReceiptModal = false;
    },
    showItemAddedSuccess(state, action) {
      state.showItemAddedSuccess = true;
      state.orderedItem = action.payload;
    },
    closeItemAddedSuccess(state) {
      state.showItemAddedSuccess = false;
    },
    showOrderExceeded(state, action) {
      state.showOrderLimitExceededModal = true;
      state.orderedItem = action.payload.item;
      state.orderAmount = action.payload.orderAmount;
    },
    closeOrderExceeded(state) {
      state.showOrderLimitExceededModal = false;
    },
    showForgotPass(state) {
      state.showLoginModal = false;
      state.showForgotPassModal = true;
    },
    closeForgotPass(state) {
      state.showForgotPassModal = false;
    },
    showEmailVer(state) {
      state.showLoginModal = false;
      state.showEmailVerModal = true;
    },
    closeEmailVer(state) {
      state.showEmailVerModal = false;
    },
    showHero(state) {
      setAllFalse(state);
      state.showSectionHero = true;
    },
    showOrder(state) {
      setAllFalse(state);
      state.showSectionOrder = true;
    },
    showTestimonials(state) {
      setAllFalse(state);
      state.showSectionTestimonials = true;
    },
    showContact(state) {
      setAllFalse(state);
      state.showSectionContact = true;
    },
    showContactSuccess(state) {
      state.showContactSuccessModal = true;
    },
    closeContactSuccess(state) {
      state.showContactSuccessModal = false;
    },
    showAccount(state) {
      setAllFalse(state);
      state.showSectionAccount = true;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
