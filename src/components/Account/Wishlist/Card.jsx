import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { cartActions } from "../../../store/cart-slice.js";

export default function Card({ item, onRemoveItemFromWishlist }) {
    const dispatch = useDispatch();
    const [isAddItemToCartClicked, setIsAddItemToCartClicked] = useState(false);

    const handleAddItemToCart = (item, size) => {
        dispatch(cartActions.addItemToCart({ item, size }))
        dispatch(cartActions.showCart());
        setIsAddItemToCartClicked(false);
    }

    return (
        <section
            key={item._id}
            className="flex flex-col gap-4 mb-4 relative">
            <section key={item._id} className="w-[15em] h-[22em] lg:w-[18em] lg:h-[25em] relative">
                <Link to={'/details/' + item._id}>
                    <img className="w-full h-full object-cover rounded-sm" src={item.images[0]} alt="" />
                </Link>

                {isAddItemToCartClicked &&
                    <section className="flex flex-col items-center bg-stone-100 w-full absolute bottom-0 gap-2 opacity-80">
                        <section className="absolute top-1 right-3 text-stone-600">
                            <svg
                                onClick={() => setIsAddItemToCartClicked(false)}
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 cursor-pointer hover:text-stone-900">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </section>

                        <h1 className="cursor-default mb-1">Select a size</h1>
                        <section className="mb-2 w-full h-full">
                            {item.variations.map(variation => {
                                return (
                                    <button
                                        onClick={() => handleAddItemToCart(item, variation)}
                                        className="uppercase text-sm hover:bg-stone-300 w-full flex justify-center cursor-pointer">
                                        {variation.name}
                                    </button>
                                )
                            }
                            )}
                        </section>
                    </section>
                }
            </section>
            {/* <Button
                onClick={() => setIsAddItemToCartClicked(true)}>
                Add to cart
            </Button> */}

            <button
                onClick={() => setIsAddItemToCartClicked(true)}
                className="border px-2 py-2 hover:border-stone-400">Add to cart</button>

            <section className="absolute top-2 right-2 border bg-white rounded-full text-black hover:bg-black hover:text-white p-1">
                <svg
                    onClick={() => onRemoveItemFromWishlist(item._id)}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </section>
        </section>
    )
}