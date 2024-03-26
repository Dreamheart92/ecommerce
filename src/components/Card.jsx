import { useState } from "react"

import { Link } from "react-router-dom";

const initialState = { frontImage: 'w-full h-full object-cover rounded-sm cursor-pointer', backImage: 'hidden' };

export default function Card({ item, ...props }) {
    const [imageClass, setImageClass] = useState(initialState);

    const handleMouseEnter = () => {
        setImageClass({
            frontImage: initialState.backImage,
            backImage: initialState.frontImage
        })
    }

    const handleMouseLeave = () => {
        setImageClass(initialState);
    }

    return (
        <section>
            <Link to={`/details/${item._id}`}>
                <div
                    {...props}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img className={imageClass.frontImage} src={item.images[0]} alt="" />
                    <img className={imageClass.backImage} src={item.images[1]} alt="" />
                </div>

                <div>
                    <h1 className="pb-1">{item.name}</h1>
                    <span>${item.price.toFixed(2)}</span>
                </div>
            </Link>
        </section>
    )
}