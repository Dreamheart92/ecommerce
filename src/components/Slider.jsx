import { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import Card from "./Card.jsx";
import Skeleton from "./Skeleton.jsx";
import { SliderContext } from "../context/SliderContext.jsx";

const itemsLoading = new Array(7).fill(null);
const scrollSpeed = 345;

export default function Slider({ items, isLoading }) {
    const slider = useRef();
    const wishlist = useSelector(state => state.wishlist);
    const { slider: sliding } = useContext(SliderContext);

    useEffect(() => {
        if (sliding === 'left') {
            slider.current.scrollLeft -= scrollSpeed;
        } else if (sliding === 'right') {
            slider.current.scrollLeft += scrollSpeed;
        }
    }, [sliding])

    if (isLoading) {
        return (
            <section className="flex flex-col items-center">

                <section className="py-8 w-full flex flex-col items-center">
                    <Skeleton style='w-20 h-3 my-4' />
                    <Skeleton style='w-96 h-3' />
                    <Skeleton style='w-12 h-4 mt-4' />
                </section>

                <section className="flex gap-2">
                    {itemsLoading.map(item =>
                        <section key={Math.random() * 1000} className="flex flex-col gap-2">
                            <Skeleton style='w-[14em] h-[22em]' />
                            <Skeleton style='w-28 h-3' />
                            <Skeleton style='w-12 h-3' />
                        </section>
                    )}
                </section>
            </section>
        )
    }

    return (
        <section className="w-full h-full">
            <section
                ref={slider}
                id="test-slider"
                className="w-full h-[29em] md:h-[31em] overflow-x-scroll no-scrollbar">
                <section
                    className="flex h-full w-full gap-2">
                    {items.map(item => {
                        const isOnWishlist = wishlist.find(wishlistItem => wishlistItem === item._id)
                        return (
                            <div
                                key={item._id}
                                id="mobile-slider-details"
                                className="min-w-[20.9em] min-h-[10em] h-[27em]">
                                <Card
                                    mobileSize="w-full h-[25em]"
                                    size="w-full h-full"
                                    item={item}
                                    isOnWishlist={isOnWishlist}
                                />
                            </div>
                        )
                    })}
                </section>
            </section>
        </section>
    )
}