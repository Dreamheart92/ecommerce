import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

import MegaMenu from "./MegaMenu.jsx";

const collections = [
    {
        imageUrl: 'https://www.vrggrl.com/cdn/shop/files/LIB5474.jpg?v=1701823536&width=960',
        caption: 'Lorem ipsum dolor sit amet.'
    },
    {
        imageUrl: 'https://www.vrggrl.com/cdn/shop/files/LIB8584_42ce7779-534d-48da-accb-c90973642e3d.jpg?v=1701824164&width=960',
        caption: 'Lorem ipsum dolor sit amet.'
    }
]

export default function Menu({
                                 isMegaMenuShown,
                                 setIsMegaMenuShown
                             }) {
    const location = useLocation();
    const [categories, setCategories] = useState([]);

    const handleMenuHover = () => {
        setIsMegaMenuShown(true);
    }

    const handleMenuLeave = () => {
        setIsMegaMenuShown(false);
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('https://rest-6apvqcaiz-toni-rachevs-projects.vercel.app/categories');
            const categories = await response.json();
            setCategories(categories);
        }

        fetchCategories();
    }, [])

    useEffect(() => {
        setIsMegaMenuShown(false);
    }, [location])

    return (
        <nav className="w-[30em] h-full">
            <ul className="flex w-full h-full gap-4 text-md">
                <Link to={'/catalogue/all?sortBy=newest'}>
                    <li>
                        New In
                    </li>
                </Link>

                <li
                    onMouseEnter={handleMenuHover}
                    onMouseLeave={handleMenuLeave}
                    className="cursor-pointer relative h-full">
                    Ready to wear

                    <MegaMenu isShown={isMegaMenuShown} items={categories} collections={collections}/>
                </li>
            </ul>
        </nav>
    )
}