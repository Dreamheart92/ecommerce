import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext.jsx";

export default function Header({ isHomePage }) {
    const { cartItems, handleCartState: onOpenCart } = useContext(CartContext);

    const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);

    const [isScrolled, setIsScrolled] = useState(false);

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
                        <Link to={'/catalogue'}>Catalogue</Link>
                    </li>
                    <li>Menu</li>
                    <li>Menu</li>
                    <li className="cursor-pointer" onClick={() => onOpenCart(true)}>Cart ({totalItems})</li>
                </ul>
            </nav>
        </header>
    )
}