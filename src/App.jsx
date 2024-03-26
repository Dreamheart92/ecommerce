import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header.jsx";
import Cart from "./components/Cart.jsx";

import { cartActions } from "./store/cart-slice.js";
import { getUserData } from "./utility/user.js";

import { setUserDataToStore } from "./store/store.js";

let isFirstRender = true;

function App() {
  const { user } = useSelector(state => state.user);
  const cart = useSelector(state => state.cart.cartItems);

  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    setUserDataToStore();
  }, [])

  useEffect(() => {

    if (user !== null) {
      const userId = user.user.id;

      const syncCart = async () => {
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

      syncCart();
    }
  }, [user])

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }

    if (user !== null) {
      const userId = user.user.id;

      fetch(`http://localhost:3000/user/${userId}/cart`, {
        method: 'Post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(cart)
      })
    }

  }, [cart])

  const isHomePage = location.pathname === '/';

  return (
    <main className="w-full h-full flex flex-col items-center">
      <Header isHomePage={isHomePage} />
      <Cart />
      <Outlet />
      <ScrollRestoration />
    </main>
  )
}

export default App;