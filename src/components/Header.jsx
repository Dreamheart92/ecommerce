import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { cartActions } from "../store/cart-slice.js";
import { clearUserData } from "../utility/user.js";

export default function Header({ isHomePage }) {
    const navigate = useNavigate();
    const { user: isLoggedIn } = useSelector(state => state.user);

    const { cartItems } = useSelector(state => state.cart);
    const [isScrolled, setIsScrolled] = useState(false);

    const dispatch = useDispatch();

    const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);

    const onOpenCart = () => {
        dispatch(cartActions.showCart());
    }

    const onLogout = () => {
        clearUserData();
        dispatch(cartActions.clearCart());
        navigate('/')
    }

    const handleScroll = () => {
        window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
    }

    useEffect(() => {
        if (isHomePage) {
            window.addEventListener('scroll', handleScroll);
        } else {
            window.removeEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }

    }, [isHomePage])

    const textColor = isScrolled || !isHomePage ? ' text-stone-900' : ' text-stone-100';

    let headerStyle = 'flex justify-between w-full px-[15em] sticky top-0 z-50 py-4' + textColor;

    if (isScrolled || !isHomePage) {
        headerStyle += ' bg-white border'
    }

    return (
        <header className={headerStyle}>
            <span className="text-2xl">
                <Link to={'/'}>Logo</Link>
            </span>

            <nav>
                <ul className="flex gap-3 text-xl">
                    <li>
                        <Link to={'/catalogue/all'}>Catalogue</Link>
                    </li>

                    {isLoggedIn &&
                        <li>
                            <button
                                onClick={onLogout}
                            >Logout</button>
                        </li>
                    }

                    {!isLoggedIn &&
                        <>
                            <li><Link to={'/signup'}>Sign Up</Link></li>
                            <li><Link to={'/login'}>Login</Link></li>
                        </>
                    }

                    <li
                        onClick={onOpenCart}
                        className="cursor-pointer">Cart ({totalItems})</li>
                </ul>
            </nav>
        </header>
    )
}