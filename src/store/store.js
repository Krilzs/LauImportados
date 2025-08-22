import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const preloadedState = {
  cart: {
    items:
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("cartItems") || "[]")
        : [],
  },
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cartItems", JSON.stringify(state.cart.items));
});
