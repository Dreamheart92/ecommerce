import { Link } from "react-router-dom";

import Button from "../../components/Button.jsx";
import Input from "../../components/Input.jsx";
import CheckoutItem from "../../components/CheckoutItem.jsx";
import { useState } from "react";

const inputMaxWidth = '50em';

export default function Mobile({
    handleSubmit,
    error,
    items,
    isLoading,
    totalPrice
}) {

    const [isOrderSummaryShowed, setIsOrderSummaryShowed] = useState(false);

    const toggleSummary = () => {
        setIsOrderSummaryShowed(summary => !summary);
    }

    if (isOrderSummaryShowed) {
        return (
            <>
                <section className="w-full flex justify-between px-4 items-center border py-2 mt-16">
                    <p>ORDER SUMMARY - {items.length}</p>
                    <section className="flex gap-2 items-center">
                        <p>${totalPrice.toFixed(2)}</p>
                        <svg
                            onClick={toggleSummary}
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>
                    </section>
                </section>

                <section className="w-full h-full">
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
            </>
        )
    }

    return (
        <section className="w-full h-full mt-16">
            <section className="w-full flex justify-between px-4 items-center border py-2 mb-2">
                <p>ORDER SUMMARY - {items.length}</p>
                <section className="flex gap-2 items-center">
                    <p>${totalPrice.toFixed(2)}</p>
                    {isOrderSummaryShowed &&
                        <>
                            <svg
                                onClick={toggleSummary}
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                            </svg>
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
                        </>
                    }

                    {!isOrderSummaryShowed &&
                        <svg
                            onClick={toggleSummary}
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    }
                </section>
            </section>

            <form
                onSubmit={handleSubmit}
                className="w-full h-full flex flex-col gap-4 p-4">

                <section className="flex flex-col gap-2">
                    <p className="text-sm">Contact</p>
                    <Input
                        error={error?.email?.message}
                        type='text'
                        size={`w-full max-w-[${inputMaxWidth}] h-full max-h-[3em]`}
                        name='email'
                        placeholder='Email'
                    />
                </section>

                <section className="flex flex-col gap-2">
                    <p className="text-sm">Delivery</p>
                    <Input
                        error={error?.country?.message}
                        size={`w-full max-w-[${inputMaxWidth}] h-full max-h-[3em]`}
                        type='text'
                        name='country'
                        placeholder='Country'
                        required
                    />
                </section>

                <section className="flex flex-col gap-4">
                    <section>
                        <Input
                            error={error?.firstName?.message}
                            type='text'
                            size={`w-full max-w-[${inputMaxWidth}] h-full max-h-[3em]`}
                            name='firstName'
                            placeholder='First name'
                            required
                        />
                    </section>

                    <section>
                        <Input
                            error={error?.lastName?.message}
                            type='text'
                            size={`w-full max-w-[${inputMaxWidth}] h-full max-h-[3em]`}
                            name='lastName'
                            placeholder='Last name'
                            required
                        />
                    </section>
                </section>

                <Input
                    error={error?.address?.message}
                    type='text'
                    name='address'
                    size={`w-full max-w-[${inputMaxWidth}] h-full max-h-[3em]`}
                    placeholder='Address'
                    required
                />

                <section className="flex flex-col gap-4">
                    <section>
                        <Input
                            error={error?.city?.message}
                            type='text'
                            size={`w-full max-w-[${inputMaxWidth}] h-full max-h-[3em]`}
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
                            size={`w-full max-w-[${inputMaxWidth}] h-full max-h-[3em]`}
                            placeholder='Postal code'
                            required
                        />
                    </section>
                </section>

                <Input
                    error={error?.phone?.message}
                    type='text'
                    name='phone'
                    placeholder='Phone'
                    size={`w-full max-w-[${inputMaxWidth}] h-full max-h-[3em]`}
                    required
                />

                <button
                    className={`bg-stone-900 px-4 py-2 w-full max-w-[${inputMaxWidth}] text-white`}
                    disabled={isLoading}
                    type='submit'
                >{isLoading ? 'Submiting...' : 'Purchase'}</button>
            </form>
        </section >
    )
}

/* 
  <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-2 w-full">
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
*/