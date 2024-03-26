import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice.js";

export default function CheckoutItem({ item }) {
    const dispatch = useDispatch();

    const onRemoveItemFromCart = (item) => {
        dispatch(cartActions.removeItemFromCart({ item }));
    }

    const totalPrice = item.quantity * item.price;

    return (
        <section className="p-4 flex gap-2">
            <section className="w-[9em] h-[10em]">
                <img className="w-full h-full object-cover" src={item?.image} alt="" />
            </section>

            <section className="px-2">
                <h1>{item.name}</h1>
                <p className="first-letter:uppercase text-stone-400">{item.brand.name}</p>

                <section className="pt-2">
                    <section className="flex flex-col gap-1 text-sm">
                        <p className="font-semibold">${totalPrice.toFixed(2)}</p>

                        <section className="flex gap-1">
                            <p className="first-letter:uppercase">{item.color.name}</p>
                            <p>/</p>
                            <p className="uppercase">{item.size.name}</p>
                        </section>

                        <span>Quantity: {item.quantity}</span>
                    </section>

                    <section>
                        <button
                            onClick={() => onRemoveItemFromCart(item)}
                            className="pt-2 underline hover:text-stone-400">Remove</button>
                    </section>
                </section>
            </section>
        </section>
    )
}