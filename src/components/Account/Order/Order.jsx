import { Link } from "react-router-dom";
import { convertDate } from "../../../utility/util.js";

export default function Order({ order }) {
    const { date, time } = convertDate(order.creation_date);
    const isMoreThanFourProducts = order.products.length > 4;

    return (
        <section className="w-[80%] h-full box-shadow flex p-4">
            <section className="w-full flex flex-col gap-2">
                <h1 className="font-semibold">{date}</h1>
                <p className="text-sm text-stone-600">Order #{order._id}</p>
                <section className="h-full flex flex-col justify-end">
                    <p className="text-sm text-stone-600">Total ${order.price.toFixed(2)}</p>
                    <section className="mt-2">
                        <Link to={'order/' + order._id}>
                            <button className="border text-sm border-stone-300 px-3 py-0.5 text-stone-900 hover:border-stone-900">View order</button>
                        </Link>
                    </section>
                </section>
            </section>

            <section className="flex w-full justify-end gap-2">
                {isMoreThanFourProducts &&
                    <section
                        className="w-[8em] h-[10em]"
                    >
                        <div className="w-full h-full bg-stone-200 flex justify-center items-center">
                            <p className="text-stone-500 text-3xl cursor-default">+{order.products.length - 4}</p>
                        </div>
                    </section>
                }

                {order.products.slice(0, 4).map(product => {
                    return (
                        <Link to={'/details/' + product._id._id}>
                            <section
                                key={product._id.images[0] + order._id}
                                className="w-[8em] h-[10em]"
                            >
                                <img
                                    className="w-full h-full object-cover"
                                    src={product._id.images[0]} alt="" />
                            </section>
                        </Link>
                    )
                })}
            </section>
        </section>
    )
}