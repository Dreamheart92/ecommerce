import { useState } from "react"
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { wishlistActions } from "../store/wishlist-slice.js";
import { cartActions } from "../store/cart-slice.js";

const imageStyle = 'object-cover rounded-sm cursor-pointer transition-opacity ease-in-out absolute duration-500 -z-10';

export default function Card({ item, size, isOnWishlist }) {
    const dispatch = useDispatch();

    const initialState = { frontImage: imageStyle + ' opacity-1 ' + size, backImage: imageStyle + ' opacity-0 ' + size };
    const [imageClass, setImageClass] = useState(initialState);

    const handleMouseEnter = () => {
        setImageClass({
            frontImage: initialState.backImage,
            backImage: initialState.frontImage
        })
    }

    const handleMouseLeave = () => {
        setImageClass(initialState);
    }

    const handleWishlist = event => {
        event.preventDefault();
        if (isOnWishlist) {
            dispatch(wishlistActions.removeItemFromWishlist({ itemId: item._id }));
        } else {
            dispatch(wishlistActions.addItemToWishlist({ itemId: item._id }));
        }
    }

    const handleAddItemToCart = (event, item, size) => {
        event.preventDefault();
        dispatch(cartActions.addItemToCart({ item, size }));
        dispatch(cartActions.showCart());
    }

    return (
        <section
            id="wishlist-container"
            className="relative overflow-hidden w-full wishlist-container">
            <Link to={`/details/${item._id}`}>
                <div
                    className={size + ' relative overflow-hidden'}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img className={imageClass.frontImage} src={item.images[0]} alt="" />
                    <img className={imageClass.backImage} src={item.images[1]} alt="" />

                    <div
                        onClick={handleWishlist}
                        id="wishlist"
                        className="absolute top-3 bg-white rounded-full p-3 text-stone-900 hover:bg-black hover:text-white cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill={isOnWishlist ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </div>

                    <div
                        id="quick-buy"
                        className="absolute -bottom-36 bg-stone-100 w-full pt-2 pb-12 opacity-80 flex flex-col items-center justify-center">
                        <p>Select a size</p>
                        <section className="flex gap-2">
                            {item.variations.map(size =>
                                <span
                                    onClick={(event) => handleAddItemToCart(event, item, size)}
                                    className="uppercase hover:bg-stone-500 w-8 h-8 flex justify-center items-center"
                                >{size.name}</span>)}
                        </section>
                    </div>
                </div>

                <div>
                    <h1 className="pb-1">{item.name}</h1>
                    <span>${item.price.toFixed(2)}</span>
                </div>
            </Link>


        </section>
    )
}