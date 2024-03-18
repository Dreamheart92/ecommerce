import { useContext, useEffect } from "react"
import { createPortal } from "react-dom";

import CartContext from "../context/CartContext.jsx"
import Button from "./Button.jsx";
import CartItem from "./CartItem.jsx";

const body = document.body;
const cartRoot = document.getElementById('cart');

export default function Cart() {
    const { cartItems,
        isCartShown,
        handleCartState: onCloseCart, } = useContext(CartContext);

    const isCartEmpty = cartItems.length <= 0;
    const openCartStyle = isCartShown ? 'visible' : 'hidden';
    const totalPrice = cartItems.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);

    useEffect(() => {
        if (isCartShown) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }

        return () => {
            body.style.overflow = '';
        }
    }, [isCartShown])

    return createPortal(
        <section className={`bg-stone-900 bg-opacity-70 fixed z-[100] inset-0 w-full h-full ${openCartStyle}`}>
            <section className={`fixed right-0 top-0 z-[101] h-screen bg-white w-[25%] ${openCartStyle}`}>
                <section className="p-4 flex justify-between items-center border">
                    <h1 className="text-xl font-bold">Cart</h1>
                    <button
                        onClick={() => onCloseCart(false)}
                        className="text-xl font-medium">X</button>
                </section>

                <section className=" overflow-auto h-[47em]">
                    {isCartEmpty &&
                        <h1 className="flex justify-center mt-[75%] text-md font-semibold">You dont have any products in your cart.</h1>
                    }

                    {!isCartEmpty && isCartShown &&
                        cartItems.map(item => {
                            return <CartItem item={item} />
                        })
                    }
                    <section className="flex justify-center absolute bottom-10 w-full">
                        <button className="border border-stone-900 w-[80%] py-2">Checkout / ${totalPrice}</button>
                    </section>
                </section>
            </section>
        </section >
        , cartRoot)
};