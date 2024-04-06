import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { cartActions } from "../../store/cart-slice.js";

import Search from "./Search.jsx";
import Account from "./Account.jsx";

const categories = [
    {
        name: 'Ready-to-wear',
        link: '/catalogue/all'
    },
    {
        name: 'Dresses',
        link: '/catalogue/Dresses'
    },
    {
        name: 'Tops',
        link: '/catalogue/Tops'
    },
    {
        name: 'T-Shirts',
        link: '/catalogue/T-Shirts'
    }
]

export default function Header() {
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    const { user: isLoggedIn } = useSelector(state => state.user);

    const { cartItems } = useSelector(state => state.cart);

    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchShowed, setIsSearchShowed] = useState(false);

    const dispatch = useDispatch();

    const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);

    const onOpenCart = () => {
        dispatch(cartActions.showCart());
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

        setIsSearchShowed(false);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }

    }, [location])

    const textColor = isScrolled || !isHomePage || isSearchShowed ? ' text-stone-900' : ' text-stone-100';

    let headerStyle = 'flex justify-between items-center w-full px-[15em] sticky top-0 z-10 py-4' + textColor;

    if (isScrolled || !isHomePage || isSearchShowed) {
        headerStyle += ' bg-white border'
    }

    return (

        <header className={headerStyle}>
            <nav className="w-[30em]">
                <ul className="flex gap-4 text-md">
                    {categories.map(category => {
                        return (
                            <Link
                                key={category.name}
                                to={category.link}>
                                <li>
                                    {category.name}
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </nav>

            <section className="">
                <span className="text-2xl">
                    <Link to={'/'}>Logo</Link>
                </span>
            </section>

            <nav className="w-[30em] flex justify-end">
                <ul className="flex gap-3">
                    <li className="flex relative search cursor-pointer">
                        <Search isSearchShowed={isSearchShowed} setIsSearchShowed={setIsSearchShowed} />
                    </li>

                    <li className="relative">
                        <Account isLoggedIn={isLoggedIn} />
                    </li>

                    <li>
                        <Link to={'/account/wishlist'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </Link>
                    </li>

                    <li
                        onClick={onOpenCart}
                        className="flex gap-1 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        {totalItems > 0 &&
                            <span>{totalItems}</span>
                        }
                    </li>
                </ul>
            </nav>
            <section className="absolute top-[4em] left-0 bg-white shadow-xl w-full h-fit z-50" id="search-results"></section>
        </header>
    )
}