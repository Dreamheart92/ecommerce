import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, redirect, useLoaderData } from "react-router-dom";

import useHttp from "../hooks/useHttp.js";

import successIcon from "../assets/success-icon.png";

import Input from "../components/Input.jsx";
import CheckoutItem from "../components/CheckoutItem.jsx";
import Button from "../components/Button.jsx";

import { cartActions } from "../store/cart-slice.js";
import { apiEndpoints } from "../api/api-endpoints.js";
import { httpConfig, submitHandler } from "../utility/util.js";
import { getUserData } from "../utility/user.js";

export default function Checkout() {
    const userId = useLoaderData();
    const { data: orderData, isLoading, error, sendRequest } = useHttp(apiEndpoints.order.createOrder, null, httpConfig('Post'));

    const dispatch = useDispatch();

    const items = useSelector(state => state.cart.cartItems);
    const totalPrice = items.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);

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

    const header = <header className="w-full flex justify-center items-center border border-stone-200 h-20">
        <Link to={'/'}>
            <h1 className="text-3xl font-bold">Logo</h1>
        </Link>
    </header>

    if (items.length <= 0) {
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

    return (
        <section>
            {header}
            <main className="w-screen h-fit flex justify-center p-4">
                <section className="w-[80%] flex gap-4">
                    <section>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-2">
                            <p className="text-xl">Contact</p>
                            <Input
                                error={error?.email?.message}
                                size='w-full h-[3em]'
                                type='text'
                                name='email'
                                placeholder='Email'
                            />

                            <p className="text-xl">Delivery</p>
                            <Input
                                error={error?.country?.message}
                                size='w-full h-[3em]'
                                type='text'
                                name='country'
                                placeholder='Country'
                                required
                            />

                            <section className="flex gap-4">
                                <section>

                                    <Input
                                        error={error?.firstName?.message}
                                        type='text'
                                        name='firstName'
                                        placeholder='First name'
                                        required
                                    />
                                </section>

                                <section>
                                    <Input
                                        error={error?.lastName?.message}
                                        type='text'
                                        name='lastName'
                                        placeholder='Last name'
                                        required
                                    />
                                </section>
                            </section>

                            <Input
                                error={error?.address?.message}
                                size='w-full h-[3em]'
                                type='text'
                                name='address'
                                placeholder='Address'
                                required
                            />

                            <section className="flex gap-4">
                                <section>

                                    <Input
                                        error={error?.city?.message}
                                        type='text'
                                        name='city'
                                        placeholder='City'
                                        required
                                    />
                                </section>

                                <section>
                                    <Input
                                        error={error?.postalCode?.message}
                                        type='text'
                                        name='postalCode'
                                        placeholder='Postal code'
                                        required
                                    />
                                </section>
                            </section>

                            <Input
                                error={error?.phone?.message}
                                size='w-full h-[3em]'
                                type='text'
                                name='phone'
                                placeholder='Phone'
                                required
                            />

                            <Button
                                disabled={isLoading}
                                type='submit'
                            >{isLoading ? 'Submiting...' : 'Purchase'}</Button>
                        </form>
                    </section>

                    <section className="m-4">
                        <section className="border border-stone-300 rounded">
                            {items.map(item => <CheckoutItem key={item._id + item.size.id} item={item} />)}
                        </section>

                        <section className="bg-stone-100 p-2 text-sm mt-2 rounded py-8 px-4">
                            <p>ORDER TOTAL</p>

                            <section className="flex justify-between mt-2 border-b-2 border-stone-200 pb-2">
                                <p>Subtotal</p>
                                <p className="font-semibold">${totalPrice}</p>
                            </section>

                            <section className="flex justify-between mt-2 border-b-2 border-stone-200 pb-2">
                                <p>Shipping</p>
                                <p className="font-semibold">${0}</p>
                            </section>

                            <section className="flex justify-between mt-2">
                                <p>Total</p>
                                <p className="font-semibold">${totalPrice}</p>
                            </section>
                        </section>
                    </section>
                </section>
            </main >
        </section>
    )
}

export const loader = () => {
    const isLoggedIn = getUserData();
    if (!isLoggedIn) {
        return redirect('/login');
    }
    const userId = isLoggedIn.user.id;
    return userId;
}