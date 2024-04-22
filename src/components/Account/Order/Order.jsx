import { Link } from "react-router-dom";
import { convertDate } from "../../../utility/util.js";
import { useWindowSize } from "../../../hooks/useWindowSize.js";

export default function Order({ order }) {
    const { isOnMobile } = useWindowSize();
    const { date, time } = convertDate(order.creation_date);

    const maximumProductsImagesToShow = isOnMobile ? 2 : 4;
    const isMoreThanMaximumProductsToShow = order.products.length > maximumProductsImagesToShow;

    let imageStyle = '';

    if (isOnMobile) {
        imageStyle = 'w-[6em] h-[8em]'
    } else {
        imageStyle = 'w-[8em] h-[10em]'
    }

    return (
        <section className="w-[90%] h-full box-shadow flex p-4">
            <section className="w-full flex flex-col gap-2">
                <h1 className="font-semibold">{date}</h1>
                <p className="text-sm text-stone-600">Order #{order._id}</p>
                <section className="h-full flex flex-col justify-end">
                    <p className="text-sm text-stone-600">Total ${order.price.toFixed(2)}</p>
                    <section className="mt-2">
                        <Link to={'order/' + order._id}>

                            <section className="flex w-full my-4 gap-2">

                                {order.products.slice(0, maximumProductsImagesToShow).map(product => {
                                    return (
                                        <Link
                                            key={product._id.images[0] + order._id}
                                            to={'/details/' + product._id._id}>
                                            <section className={imageStyle}>
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={product._id.images[0]} alt="" />
                                            </section>
                                        </Link>
                                    )
                                })}

                                {isMoreThanMaximumProductsToShow &&
                                    <section
                                        className={imageStyle}
                                    >
                                        <div className="w-full h-full bg-stone-200 flex justify-center items-center">
                                            <p className="text-stone-500 text-3xl cursor-default">+{order.products.length - maximumProductsImagesToShow}</p>
                                        </div>
                                    </section>
                                }
                            </section>
                            <button className="border text-sm border-stone-300 px-3 py-0.5 text-stone-900 hover:border-stone-900">View order</button>
                        </Link>
                    </section>
                </section>
            </section>
        </section>
    )
}