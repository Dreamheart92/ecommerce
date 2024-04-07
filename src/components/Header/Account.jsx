import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice.js";
import { clearUserData } from "../../utility/user.js";

export default function Account({ isLoggedIn }) {
    const [isHover, setIsHover] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    //TODO : Create generic function for handleLogout

    const handleLogout = () => {
        clearUserData();
        dispatch(cartActions.clearCart());
        navigate('/')
    }

    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    useEffect(() => {
        return () => {
            setIsHover(false);
        }
    }, [isLoggedIn])

    const icon = <svg
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6 cursor-pointer">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
    const menuItemsStyle = 'py-1 px-2 border-b-[.05em] border-stone-100 border-solid hover:bg-stone-100 hover:rounded-sm cursor-pointer';

    if (!isLoggedIn) {
        return (
            <Link to={!isLoggedIn ? '/login' : null}>
                {icon}
            </Link>
        )
    }

    return (
        <section
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {icon}
            {isLoggedIn && isHover &&
                <section className="absolute bg-white top-6 -left-[3em] p-4 w-[22em] text-stone-900 flex flex-col gap-4 shadow-2xl border">
                    <Link className={menuItemsStyle} to={'/account/dashboard'}>
                        <span
                        >My account</span>
                    </Link>

                    <Link className={menuItemsStyle} to={'/account/orders'}>
                        <span
                        >My orders</span>
                    </Link>

                    <Link className={menuItemsStyle} to={'/account/wishlist'}>
                        <span
                        >My wishlist</span>
                    </Link>

                    <span
                        onClick={handleLogout}
                        className="py-1 px-2 hover:bg-stone-100 cursor-pointer">Sign out</span>
                </section>
            }
        </section >
    )
}