import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "../components/Button.jsx";

import { cartActions } from "../store/cart-slice.js";
import useHttp from "../hooks/useHttp.js";
import { apiEndpoints } from "../api/api-endpoints.js";

export default function Details() {
    const { id } = useParams();
    const { data: item, isLoading, error } = useHttp(apiEndpoints.items.item + '/' + id);

    const dispatch = useDispatch();

    const [selectedSize, setSelectedSize] = useState(null);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const handleSelectSize = (size) => {
        setSelectedSize(size);
    }

    const handleAddToCart = () => {
        setIsButtonClicked(true);

        if (selectedSize !== null) {
            dispatch(cartActions.addItemToCart({ item, size: selectedSize }));
            dispatch(cartActions.showCart());
        }
    }

    return (
        <section className="w-full h-full flex">
            <section className="grid grid-cols-2 gap-2 w-[65%] h-full">
                {item?.images.map(image =>
                    <img key={image} className="w-[40em] h-[50em] object-cover cursor-pointer" src={image} />
                )}
            </section>

            <section className="p-10 w-[30%] fixed right-24">
                <section className="flex justify-between items-center">
                    <h1 className="font-bold text-xl">{item?.name}</h1>
                    <p className=" font-medium">${item?.price.toFixed(2)}</p>
                </section>

                <section>
                    <p className="first-letter:uppercase text-stone-400 pt-1">{item?.brand?.name}</p>
                    <p className="py-6 w-[90%]">{item?.description}</p>

                    <p className="pb-2">Color</p>
                    <div className={`w-5 h-5 border border-black bg-[${item?.color?.name}]`}></div>

                    <section className="py-4">
                        <p className="pb-2">Sizes</p>
                        {item?.variations.map(variation => {

                            const isSelected = variation?.name === selectedSize?.name;
                            const borderColor = isSelected ? 'border-stone-900' : 'border-stone-300'
                            const spanStyle = 'border px-2 mr-1 uppercase cursor-pointer ' + borderColor;

                            return <span
                                key={variation.id}
                                onClick={() => handleSelectSize(variation)}
                                className={spanStyle}>
                                {variation?.name}
                            </span>
                        }
                        )}
                    </section>

                    <section className="pt-8">
                        <Button
                            onClick={handleAddToCart}
                            style=' w-full'>Add to cart</Button>
                        {isButtonClicked && selectedSize === null &&
                            <p className=" text-red-700 pt-2">Please select a size.</p>
                        }
                    </section>
                </section>
            </section>
        </section>
    )
}