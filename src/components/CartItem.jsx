import { useDispatch } from "react-redux"

import { cartActions } from "../store/cart-slice.js";

export default function CartItem({ item }) {
    const dispatch = useDispatch();

    const onIncrementItem = (item) => {
        dispatch(cartActions.incrementItem({ item }));
    }

    const onDecrementItem = (item) => {
        dispatch(cartActions.decrementItem({ item }));
    }

    const onRemoveItemFromCart = (item) => {
        dispatch(cartActions.removeItemFromCart({ item }));
    }

    return (
        <section key={item.size.id} className="p-4 flex gap-2">
            <section className="min-w-[6em] max-w-[9em] min-h-[7em] max-h-[42em]">
                <img className="w-full h-full object-cover object-center" src={item?.image} alt="" />
            </section>

            <section className="text-sm">
                <h1>{item.name}</h1>
                <p className="first-letter:uppercase text-stone-400">{item.brand.name}</p>

                <section className="pt-2">
                    <section className="flex gap-1 text-sm">
                        <p className="uppercase">{item.size.name}</p>

                        <p>/</p>

                        <p>${item.price.toFixed(2)}</p>
                    </section>

                    <section className="flex items-center gap-2 pt-4">
                        <button
                            disabled={item.quantity <= 1}
                            onClick={() => onDecrementItem(item)}
                            className="w-5 h-5 bg-stone-900 rounded-full text-white flex justify-center items-center cursor-pointer hover:bg-stone-500 disabled:bg-stone-400 disabled:cursor-not-allowed">
                            -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                            disabled={item.quantity >= item.size.quantity}
                            onClick={() => onIncrementItem(item)}
                            className="w-5 h-5 bg-stone-900 rounded-full text-white flex justify-center items-center cursor-pointer hover:bg-stone-500 disabled:bg-stone-400 disabled:cursor-not-allowed">
                            +
                        </button>
                    </section>

                    <section>
                        <button
                            onClick={() => onRemoveItemFromCart(item)}
                            className="pt-2 underline hover:text-stone-400">Remove from cart</button>
                    </section>
                </section>
            </section>
        </section>
    )
}