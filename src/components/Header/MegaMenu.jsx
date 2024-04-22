import { createPortal } from "react-dom";
import { Link, useParams } from "react-router-dom";

import CollectionCard from "../CollectionCard.jsx";

export default function MegaMenu({ isShown, items, collections }) {
    const { category } = useParams();

    if (isShown) {
        return (
            createPortal(
                <section className="absolute left-0 bg-white w-full 
            px-2 pb-2 shadow-xl rounded-sm flex h-[18em] max-h-[20em] justify-center
            before:content-[''] before:absolute before:w-full before:-mt-6 before:h-[1.4em] before:max-h-[5em]
            ">
                    <section className="flex w-[60%] justify-center h-full">
                        <ul className="w-full flex flex-col flex-wrap items-evenly max-h-[15em]  gap-2 px-4">
                            <p className="text-stone-900 text-[.85me]">Ready to wear</p>
                            {items.map(item =>
                                <>
                                    <Link
                                        to={`/catalogue/${item.name}`}
                                    >
                                        <li
                                            className={`first-letter:uppercase text-stone-${category === item.name ? '900 font-bold' : '600'} hover:text-stone-900 hover:font-bold w-full h-full text-[.85em]`}>
                                            {item.name}
                                        </li>
                                    </Link>
                                </>
                            )}
                        </ul>

                        <section className="w-full h-full flex gap-2 p-4">
                            {collections.map(collection =>
                                <section
                                    className="max-w-[15em] h-full text-sm"
                                    key={collection.imageUrl}>
                                    <CollectionCard collection={collection} labelFontSize="xl" />
                                </section>
                            )}
                        </section>
                    </section>
                </section>
                , document.getElementById('dropdown'))
        )
    }
}