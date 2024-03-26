import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./cart-slice.js";
import userSlice, { userActions } from "./user-slice.js";

const store = configureStore({
    reducer: { cart: cartSlice, user: userSlice }
})

addEventListener('storage', () => {
    setUserDataToStore();
})

export const setUserDataToStore = () => {
    const session = localStorage.getItem('session_data');
    const parsedData = JSON.parse(session);
    store.dispatch(userActions.storeDataFromLocalStorage({ user: parsedData }))
}

export default store;