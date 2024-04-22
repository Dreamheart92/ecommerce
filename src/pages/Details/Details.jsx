import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { cartActions } from "../../store/cart-slice.js";
import { wishlistActions } from "../../store/wishlist-slice.js";
import { apiEndpoints } from "../../api/api-endpoints.js";
import { getUserData } from "../../utility/user.js";

import Desktop from "./Desktop.jsx";
import Mobile from "./Mobile.jsx";
import { useWindowSize } from "../../hooks/useWindowSize.js";

export default function Details() {
    const { item, isLoggedIn } = useLoaderData();
    const dispatch = useDispatch();

    const { isOnMobile } = useWindowSize();

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

    if (isOnMobile) {
        return <Mobile
            item={item}
            isLoggedIn={isLoggedIn}
            isItemOnTheWishlist={isItemOnTheWishlist}
            handleAddToCart={handleAddToCart}
            handleSelectSize={handleSelectSize}
            selectedSize={selectedSize}
            isButtonClicked={isButtonClicked}
            handleWishlist={handleWishlist}
        />
    } else {
        return <Desktop
            item={item}
            isLoggedIn={isLoggedIn}
            isItemOnTheWishlist={isItemOnTheWishlist}
            handleAddToCart={handleAddToCart}
            handleSelectSize={handleSelectSize}
            selectedSize={selectedSize}
            isButtonClicked={isButtonClicked}
            handleWishlist={handleWishlist}
        />
    }
}

export const loader = async ({ request, params }) => {
    const isLoggedIn = getUserData() !== null;
    const { id: itemId } = params;

    const response = await fetch(apiEndpoints.items.item + '/' + itemId);
    const item = await response.json();
    return { item, isLoggedIn };
};