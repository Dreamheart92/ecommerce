import { useState } from "react";
import { useLoaderData, useParams, Link, useNavigate, Outlet, redirect } from "react-router-dom";
import { getUserData } from "../utility/user.js";
import { capitalizeFullName } from "../utility/util.js";
import { useDispatch } from "react-redux";

import { cartActions } from "../store/cart-slice.js";
import { clearUserData } from "../utility/user.js";

import Orders from "../components/Account/Order/Orders.jsx";
import Settings from "../components/Account/Settings.jsx";
import Wishlist from "../components/Account/Wishlist/Wishlist.jsx";

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
    const fullName = capitalizeFullName(userData.firstName, userData.lastName);

    const [localWishlist, setlocalWishlist] = useState(userData.wishlist);

    const handleRemoveItemFromLocalWishlist = (itemId) => {
        setlocalWishlist(wishlist => wishlist.filter(wishlistItem => wishlistItem._id !== itemId));
    }

    const handleLogout = () => {
        clearUserData();
        dispatch(cartActions.clearCart());
        navigate('/')
    }

    const menuItemStyle = 'cursor-pointer hover:bg-stone-100 p-2'

    return (
        <section className="flex flex-col w-[80%] mt-12">

            <section className="text-center pb-4">
                <h1 className="font-bold text-xl">My account</h1>
            </section>

            <section className="flex gap-4 mt-8 h-[15em]">
                <section className="flex flex-col shadow-2xl p-4 gap-4 rounded-xl w-[20em] border border-stone-200">
                    <Link
                        className={menuItemStyle}
                        to={'/account/orders'}>
                        <span>My orders</span>
                    </Link>

                    <Link
                        className={menuItemStyle}
                        to={'/account/settings'}>
                        <span>My settings</span>
                    </Link>

                    <Link
                        className={menuItemStyle}
                        to={'/account/wishlist'}>
                        <span>My wishlist</span>
                    </Link>

                    <span
                        onClick={handleLogout}
                        className={menuItemStyle}>Sign out</span>
                </section>

                {/* <section className="shadow-2xl rounded-xl p-4 border border-stone-200 ml-[2em] w-full flex"> */}
                <section className=" ml-[2em] w-full flex">
                    <Outlet />

                    {activeView === VIEW_TYPES.dashboard &&
                        <h1 className="flex justify-center w-full items-center">Welcome, {fullName}!</h1>
                    }

                    {activeView === VIEW_TYPES.orders && !orderId &&
                        <Orders orders={userData.orders} />
                    }

                    {activeView === VIEW_TYPES.settings &&
                        <Settings
                            id={userData._id}
                            firstName={userData.firstName}
                            lastName={userData.lastName}
                            email={userData.email}
                        />
                    }

                    {activeView === VIEW_TYPES.wishlist &&
                        <Wishlist
                            wishlist={localWishlist}
                            onRemoveItemFromWishlist={handleRemoveItemFromLocalWishlist}
                        />
                    }
                </section>
            </section>
        </section>
    )
}

export const loader = async () => {
    const isLoggedIn = getUserData();

    if (!isLoggedIn) {
        return redirect('/login');
    }

    const userId = isLoggedIn.user.id;
    const userData = await fetch('http://localhost:3000/user/' + userId);

    return userData;
}