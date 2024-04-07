import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import CartItem from "./CartItem.jsx";

import { cartActions } from "../store/cart-slice.js";

const body = document.body;
const cartRoot = document.getElementById('cart');

export default function Cart() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { cartItems, isCartShown } = useSelector(state => state.cart);


    const isCartEmpty = cartItems.length <= 0;
    const cartVisibilityClass = isCartShown ? 'translate-x-0' : 'translate-x-full';
    const totalPrice = cartItems.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);

    useEffect(() => {
        onCloseCart();
    }, [location])

    useEffect(() => {
        return () => {
            onCloseCart();
        }
    }, [])

    useEffect(() => {
        const closeCart = (event) => {
            const backdrop = document.getElementById('backdrop');

            if (event.target.contains(backdrop)) {
                onCloseCart();
            }
        }

        if (isCartShown) {
            document.addEventListener('click', closeCart);
            body.style.overflow = 'hidden';
        } else {
            document.removeEventListener('click', closeCart);
            body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('click', closeCart);
            body.style.overflow = '';
        }
    }, [isCartShown])

    const onCloseCart = () => {
        dispatch(cartActions.closeCart());
    }

    return createPortal(
        <section id="backdrop" className={isCartShown ? 'active' : undefined}>
            <section className={`fixed right-0 top-0 z-[101] h-screen bg-white w-[25%] ${cartVisibilityClass} transition duration-300`}>
                <section className="p-4 flex justify-between items-center border">
                    <h1 className="text-xl font-bold">Cart</h1>
                    <button
                        onClick={onCloseCart}
                        className="text-xl font-medium">X</button>
                </section>

                <section className=" overflow-auto h-[47em]">
                    {isCartEmpty &&
                        <h1 className="flex justify-center mt-[75%] text-md font-semibold">You dont have any products in your cart.</h1>
                    }

                    {!isCartEmpty && isCartShown &&
                        <>
                            {cartItems.map(item => {
                                return <CartItem key={item.size.id + item.name} item={item} />
                            })}

                            <section className="absolute bottom-10 w-full">
                                <Link
                                    to={'/checkout'}
                                    className="flex justify-center">
                                    <button className="border border-stone-900 w-[80%] py-2">Checkout / ${totalPrice}</button>
                                </Link>
                            </section>
                        </>
                    }

                </section>
            </section>
        </section>
        , cartRoot)
};