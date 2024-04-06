import { useEffect, useRef } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header/Header.jsx";
import Cart from "./components/Cart.jsx";

import { cartActions } from "./store/cart-slice.js";

import { setUserDataToStore } from "./store/store.js";
import { addCartToDb } from "./api/cart.js";
import { wishlistActions } from "./store/wishlist-slice.js";

const syncCart = async (userId, cart, dispatch) => {
  const response = await fetch(`http://localhost:3000/user/${userId}/cart`);
  const responseData = await response.json();

  cart.forEach(cartItem => {
    const isAlreadyInCart = responseData.cart.find(item => item._id === cartItem._id && item.size.id === cartItem.size.id);

    if (!isAlreadyInCart) {
      responseData.cart.push(cartItem);
    }
  })

  dispatch(cartActions.setCartItems({ cart: responseData.cart }));
}

function App() {
  const isFirstRender = useRef(true);
  const { user } = useSelector(state => state.user);
  const cart = useSelector(state => state.cart.cartItems);
  const wishlist = useSelector(state => state.wishlist);

  const dispatch = useDispatch();

  useEffect(() => {
    setUserDataToStore();
  }, [])

  useEffect(() => {
    if (user !== null) {
      const userId = user.user.id;
      syncCart(userId, cart, dispatch);

      const getWishlist = async () => {
        const response = await fetch('http://localhost:3000/user/wishlist/' + userId);
        const wishlist = await response.json();

        dispatch(wishlistActions.setWishlist({ wishlist }));
      }

      getWishlist();
    }
  }, [user])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (user !== null) {
      const userId = user.user.id;
      addCartToDb(userId, cart);
    }

  }, [cart])

  useEffect(() => {
    if (user !== null) {
      const userId = user.user.id;
      fetch('http://localhost:3000/user/wishlist/' + userId, {
        method: 'Post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(wishlist)
      })
    }
  }, [wishlist])

  return (
    <main className="w-full h-full flex flex-col items-center">
      <Header />
      <Cart />
      <Outlet />
      <ScrollRestoration />
    </main>
  )
}

export default App;