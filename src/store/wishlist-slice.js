import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addItemToWishlist(state, action) {
            const isAlreadyOnTheWishlist = state.findIndex(item => item === action.payload.itemId);

            if (isAlreadyOnTheWishlist === -1) {
                state.push(action.payload.itemId);
            }
        },
        removeItemFromWishlist(state, action) {
            const indexOfItem = state.findIndex(item => item === action.payload.itemId);
            state.splice(indexOfItem, 1);
        },
        setWishlist(state, action) {
            state.push(...action.payload.wishlist);
        }
    }
})

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice.reducer;