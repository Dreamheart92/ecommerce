import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { wishlistActions } from "../../../store/wishlist-slice.js";
import { cartActions } from "../../../store/cart-slice.js";

import Button from "../../Button.jsx";
import Card from "./Card.jsx";

export default function Wishlist({ wishlist, onRemoveItemFromWishlist }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemoveItemFromWishlist = (itemId) => {
        onRemoveItemFromWishlist(itemId);
        dispatch(wishlistActions.removeItemFromWishlist({ itemId }));
    }

    const handleBackToShop = () => {
        navigate('/catalogue/all');
    }

    if (wishlist.length <= 0) {
        return (
            <section className="flex flex-col gap-4 text-md">
                <h1 className="font-semibold">You still do not have any items to the wishlist.</h1>
                <Button
                    onClick={handleBackToShop}
                >Back to shop</Button>
            </section>
        )
    }

    return (
        <section>
            <h1 className="font-semibold text-xl">Wishlist</h1>

            <section className="flex gap-2 mt-4 w-full flex-wrap">
                {wishlist.map(wishlistItem => <Card
                    key={wishlistItem._id}
                    item={wishlistItem}
                    onRemoveItemFromWishlist={handleRemoveItemFromWishlist}
                />)}
            </section>
        </section>
    )
}