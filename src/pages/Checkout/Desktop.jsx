import { Link } from "react-router-dom";

import Button from "../../components/Button.jsx";
import Input from "../../components/Input.jsx";
import CheckoutItem from "../../components/CheckoutItem.jsx";

const header = <header className="w-full flex justify-center items-center border border-stone-200 h-20">
    <Link to={'/'}>
        <h1 className="text-3xl font-bold">Logo</h1>
    </Link>
</header>

export default function Desktop({
    handleSubmit,
    error,
    items,
    isLoading,
    totalPrice
}) {
    return (
        <section className="w-full">
            {header}
            <main className="w-full h-full flex justify-center p-4">
                <section className="w-[80%] flex gap-4">
                    <section className="w-[65%]">
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
                                <section className="w-[50%]">
                                    <Input
                                        error={error?.firstName?.message}
                                        type='text'
                                        name='firstName'
                                        size='w-full h-[3em]'
                                        placeholder='First name'
                                        required
                                    />
                                </section>

                                <section className="w-[50%]">
                                    <Input
                                        error={error?.lastName?.message}
                                        type='text'
                                        size='w-full h-[3em]'
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
                                <section className="w-[50%]">
                                    <Input
                                        error={error?.city?.message}
                                        type='text'
                                        name='city'
                                        size='w-full h-[3em]'
                                        placeholder='City'
                                        required
                                    />
                                </section>

                                <section className="w-[50%]">
                                    <Input
                                        error={error?.postalCode?.message}
                                        type='text'
                                        size='w-full h-[3em]'
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

                    <section className="m-4 w-[35%]">
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