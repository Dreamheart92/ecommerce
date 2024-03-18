import { useContext } from "react";
import CartContext from "../context/CartContext.jsx";

export default function CartItem({ item }) {
    const { incrementItem, decrementItem, removeItemFromCart } = useContext(CartContext);

    const onIncrementItem = (item) => {
        incrementItem(item);
    }

    const onDecrementItem = (item) => {
        decrementItem(item);
    }

    const onRemoveItemFromCart = (item) => {
        removeItemFromCart(item);
    }

    return (
        <section key={item.size.id} className="p-4 flex gap-2">
            <section className="w-[9em] h-[10em]">
                <img className="w-full h-full object-cover" src={item?.image} alt="" />
            </section>

            <section className="px-2">
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