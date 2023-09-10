import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import ui from "./ui";
import order from "./order";
import cart from "./cart";
import checkout from "./checkout";
import receipt from "./receipt";

export default store = configureStore({
  reducer: { auth, ui, order, cart, checkout, receipt },
});
