import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, redirect, useLoaderData } from "react-router-dom";

import useHttp from "../../hooks/useHttp.js";

import successIcon from "../../assets/success-icon.png";

import Button from "../../components/Button.jsx";
import Desktop from "./Desktop.jsx";

import { cartActions } from "../../store/cart-slice.js";
import { apiEndpoints } from "../../api/api-endpoints.js";
import { httpConfig, submitHandler } from "../../utility/util.js";
import { getUserData } from "../../utility/user.js";
import { useWindowSize } from "../../hooks/useWindowSize.js";
import Mobile from "./Mobile.jsx";

const header = <header className="w-full flex justify-center items-center border border-stone-200 h-20">
    <Link to={'/'}>
        <h1 className="text-3xl font-bold">Logo</h1>
    </Link>
</header>

export default function Checkout() {
    const userId = useLoaderData();
    const { data: orderData, isLoading, error, sendRequest } = useHttp(apiEndpoints.order.createOrder, null, httpConfig('Post'));

    const dispatch = useDispatch();

    const items = useSelector(state => state.cart.cartItems);
    const totalPrice = items.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);

    const { isOnMobile, innerWidth } = useWindowSize();

    useEffect(() => {
        if (orderData) {
            dispatch(cartActions.clearCart());
        }
    }, [orderData])

    const handleSubmit = (event) => {
        const userData = submitHandler(event);

        const orderItems = items.map(item => {
            return {
                _id: item._id,
                sizeId: item.size.id,
                quantity: item.quantity
            }
        })

        const orderData = {
            userData,
            userId,
            orderItems,
            price: totalPrice
        }

        sendRequest(orderData);
    }

    if (items.length <= 0 && !orderData) {
        return (
            <>
                {header}
                <section className="w-full flex flex-col justify-center items-center h-full mt-12">
                    <h1 className="font-semibold text-xl mb-4">Your cart is empty.</h1>
                    <Link
                        to={'/catalogue/all'}>
                        <Button>Back to shop</Button>
                    </Link>
                </section>
            </>
        )
    }

    if (orderData) {
        return (
            <section className="flex flex-col h-screen w-screen">
                {header}
                <section className="flex flex-col pt-[10%] items-center w-full h-full">
                    <img className="w-20 h-20 mb-8" src={successIcon} alt="" />
                    <h1 className="text-xl font-bold">Order confirmed!</h1>
                    <p className="text-stone-500 text-sm m-2">Order number: {orderData._id}</p>
                    <p className="my-2">Your order has been processed and is now in motion. 🚀 Let the excitement begin! #OrderSuccess #HappyCustomer</p>

                    <section className="mt-4 flex gap-4">
                        <button className="border border-stone-400 px-8 py-2">VIEW ORDER</button>
                        {/* <button className=" bg-orange-400 px-8 py-2 text-white rounded-sm">CONTINUE SHOPPING</button> */}
                        <Link to={'/catalogue/all'}><Button>CONTINUE SHOPPING</Button></Link>
                    </section>
                </section>
            </section>
        )
    }

    console.log({ isOnMobile, innerWidth });

    if (isOnMobile) {
        return <Mobile
            handleSubmit={handleSubmit}
            error={error}
            items={items}
            isLoading={isLoading}
            totalPrice={totalPrice}
        />
    } else {
        return <Desktop
            handleSubmit={handleSubmit}
            error={error}
            items={items}
            isLoading={isLoading}
            totalPrice={totalPrice}
        />
    }
}

export const loader = () => {
    const isLoggedIn = getUserData();
    if (!isLoggedIn) {
        return redirect('/login');
    }
    const userId = isLoggedIn.user.id;
    return userId;
}