import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartItems: [], isCartShown: false };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        showCart(state) {
            state.isCartShown = true;
        },
        closeCart(state) {
            state.isCartShown = false
        },
        addItemToCart(state, action) {
            const existingItem = state.cartItems.find(item => item._id === action.payload.item._id && item.size.id === action.payload.size.id);

            if (!existingItem) {
                const newItem = {
                    _id: action.payload.item._id,
                    name: action.payload.item.name,
                    brand: action.payload.item.brand,
                    price: action.payload.item.price,
                    size: action.payload.size,
                    image: action.payload.item.images[0],
                    color: action.payload.item.color,
                    quantity: 1,
                }
                state.cartItems.push(newItem);
            } else {
                existingItem.quantity = existingItem.quantity + 1;
            }
        },
        removeItemFromCart(state, action) {
            const indexOfItem = state.cartItems.findIndex(item => item._id === action.payload.item._id && item.size.id === action.payload.item.size.id);
            state.cartItems.splice(indexOfItem, 1);
        },
        incrementItem(state, action) {
            const existingItem = state.cartItems.find(item => action.payload.item._id && item.size.id === action.payload.item.size.id);
            existingItem.quantity++
        },
        decrementItem(state, action) {
            const existingItem = state.cartItems.find(item => item._id === action.payload.item._id && item.size.id === action.payload.item.size.id);

            if (action.payload.item.quantity - 1 <= 0) {
                state.cartItems.splice(existingItem, 1);
            } else {
                existingItem.quantity--
            }
        },
        setCartItems(state, action) {
            state.cartItems = action.payload.cart;
        },
        clearCart(state, action) {
            state.cartItems = [];
        }
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;