import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { cartActions } from "../store/cart-slice.js";
import { wishlistActions } from "../store/wishlist-slice.js";
import { apiEndpoints } from "../api/api-endpoints.js";
import { getUserData } from "../utility/user.js";

import Button from "../components/Button.jsx";

export default function Details() {
    const { item, isLoggedIn } = useLoaderData();
    const dispatch = useDispatch();

    const wishlist = useSelector(state => state.wishlist);
    const isItemOnTheWishlist = wishlist.findIndex(wishlistItem => wishlistItem === item._id);

    const [selectedSize, setSelectedSize] = useState(null);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const handleSelectSize = (size) => {
        setSelectedSize(size);
    }

    const handleAddToCart = () => {
        setIsButtonClicked(true);

        if (selectedSize !== null) {
            dispatch(cartActions.addItemToCart({ item, size: selectedSize }));
            dispatch(cartActions.showCart());
        }
    }

    const handleWishlist = () => {
        if (isItemOnTheWishlist !== -1) {
            dispatch(wishlistActions.removeItemFromWishlist({ itemId: item._id }));
        } else {
            dispatch(wishlistActions.addItemToWishlist({ itemId: item._id }));
        }
    }

    return (
        <section className="w-full h-full flex">
            <section className="grid grid-cols-2 gap-2 w-[65%] h-full">
                {item?.images.map(image =>
                    <img key={image} className="w-[40em] h-[50em] object-cover cursor-pointer" src={image} />
                )}
            </section>

            <section className="p-10 w-[30%] fixed right-24">
                <section className="flex justify-between items-center">
                    <h1 className="font-bold text-xl">{item?.name}</h1>
                    <p className=" font-medium">${item?.price.toFixed(2)}</p>
                </section>

                <section>
                    <p className="first-letter:uppercase text-stone-400 pt-1">{item?.brand?.name}</p>
                    <p className="py-6 w-[90%]">{item?.description}</p>

                    <p className="pb-2">Color</p>
                    <div className={`w-5 h-5 border border-black bg-[${item?.color?.name}]`}></div>

                    <section className="py-4">
                        <p className="pb-2">Sizes</p>
                        {item?.variations.map(variation => {

                            const isSelected = variation?.name === selectedSize?.name;
                            const borderColor = isSelected ? 'border-stone-900' : 'border-stone-300'
                            const spanStyle = 'border px-2 mr-1 uppercase cursor-pointer ' + borderColor;

                            return <span
                                key={variation.id}
                                onClick={() => handleSelectSize(variation)}
                                className={spanStyle}>
                                {variation?.name}
                            </span>
                        }
                        )}
                    </section>

                    <section className="pt-8 flex gap-2">
                        <section className="w-full">
                            <Button
                                onClick={handleAddToCart}
                                style=' w-full'>Add to cart</Button>
                            {isButtonClicked && selectedSize === null &&
                                <p className=" text-red-700 pt-2">Please select a size.</p>
                            }
                        </section>

                        <section className="relative">
                            <Button
                                onClick={() => isLoggedIn ? handleWishlist() : null}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill={isItemOnTheWishlist !== -1 ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </Button>
                        </section>
                    </section>
                </section>
            </section>
        </section>
    )
}

export const loader = async ({ request, params }) => {
    const isLoggedIn = getUserData() !== null;
    const { id: itemId } = params;

    const response = await fetch(apiEndpoints.items.item + '/' + itemId);
    const item = await response.json();
    return { item, isLoggedIn };
};