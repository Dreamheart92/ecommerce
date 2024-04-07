import { useSelector } from "react-redux";

import Button from "./Button.jsx";
import Card from "./Card.jsx";
import Skeleton from "./Skeleton.jsx";

const itemsLoading = new Array(7).fill(null);

export default function Items({ label, items, isLoading }) {
    const wishlist = useSelector(state => state.wishlist);

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
        <section className="flex flex-col items-center">

            <section className="pb-8 w-full text-center">
                <p className="py-4 text-xl font-md text-stone-800">{label}</p>
                <p>Step into style with our stunning new arrivals! 💃 Discover the latest trends and elevate your wardrobe with elegance and flair. #FashionForward</p>
                <Button variant="text">View all</Button>
            </section>

            <section className="flex gap-2">
                {items.map(item => {
                    const isOnWishlist = wishlist.find(wishlistItem => wishlistItem === item._id)
                    return (
                        <Card
                            key={item._id}
                            size="w-[14em] h-[22em]"
                            item={item}
                            isOnWishlist={isOnWishlist}
                        />
                    )
                })}
            </section>
        </section>
    )
}