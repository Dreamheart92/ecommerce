import { useState } from "react";
import { useLoaderData, useParams, useNavigate, redirect } from "react-router-dom";
import { useWindowSize } from "../../hooks/useWindowSize.js";
import { getUserData } from "../../utility/user.js";
import { useDispatch } from "react-redux";

import { cartActions } from "../../store/cart-slice.js";
import { clearUserData } from "../../utility/user.js";

import Desktop from "./Desktop.jsx";
import Mobile from "./Mobile.jsx";

const VIEW_TYPES = {
    dashboard: 'dashboard',
    settings: 'settings',
    orders: 'orders',
    wishlist: 'wishlist'
}

export default function Account() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { activeView, id: orderId } = useParams();

    const userData = useLoaderData();

    const [localWishlist, setlocalWishlist] = useState(userData.wishlist);

    const { isOnMobile } = useWindowSize();

    const handleRemoveItemFromLocalWishlist = (itemId) => {
        setlocalWishlist(wishlist => wishlist.filter(wishlistItem => wishlistItem._id !== itemId));
    }

    const handleLogout = () => {
        clearUserData();
        dispatch(cartActions.clearCart());
        navigate('/');
    }

    if (!isOnMobile) {
        return <Desktop
            handleLogout={handleLogout}
            activeView={activeView}
            userData={userData}
            orderId={orderId}
            wishlist={localWishlist}
            onRemoveItemFromWishlist={handleRemoveItemFromLocalWishlist}
        />
    } else {
        return <Mobile
            handleLogout={handleLogout}
            activeView={activeView}
            userData={userData}
            orderId={orderId}
            wishlist={localWishlist}
            onRemoveItemFromWishlist={handleRemoveItemFromLocalWishlist}
        />
    }
}

export const loader = async () => {
    const isLoggedIn = getUserData();

    if (!isLoggedIn) {
        return redirect('/login');
    }

    const userId = isLoggedIn.user.id;
    const userData = await fetch('http://192.168.0.189:3000/user/' + userId);

    return userData;
}