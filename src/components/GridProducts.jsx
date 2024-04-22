import { useSelector } from "react-redux";

import Card from "./Card.jsx";

export default function GridProducts({ items }) {
    const wishlist = useSelector(state => state.wishlist);

    return (
        <section className="w-full h-full grid grid-cols-2 sm:grid-cols-3 gap-2">
            {items?.map(item => {
                const isOnWishlist = wishlist.find(wishlistItem => wishlistItem === item._id)
                return (
                    <Card
                        key={item?._id}
                        mobileSize='w-full h-full'
                        size='w-full min-h-[40em] max-h-[60em] lg:min-h-[40em] lg:max-h-[50em] 2xl:min-h-[50em]'
                        item={item}
                        isOnWishlist={isOnWishlist}
                    />)
            }
            )}
        </section>
    )
}