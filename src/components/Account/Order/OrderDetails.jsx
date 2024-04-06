import { useParams, useLoaderData } from "react-router-dom";
import { capitalizeFullName, convertDate } from "../../../utility/util.js";

const getSizeName = (sizeId, variations) => {
    return variations.find(variation => variation.id === sizeId).name;
}

export default function OrderDetails() {
    const order = useLoaderData();

    const { date, time } = convertDate(order.creation_date);
    const fullName = capitalizeFullName(order.customerData.firstName, order.customerData.lastName);

    return (
        <section className="w-[80%]">
            <h1 className="font-semibold text-xl">Order details</h1>

            <section className="flex gap-2">
                <section className="w-full border shadow-xl flex justify-between p-4">
                    <h1>Date of order </h1>
                    <p>{date}</p>
                </section>

                <section className="flex w-full justify-between p-4 border shadow-xl">
                    <h1>Order</h1>
                    <p>#{order._id}</p>
                </section>
            </section>

            <section className="w-full p-4 border shadow-xl mt-4">
                <h1 className="font-semibold">Customer and order details</h1>
                <section className="">
                    <p>{fullName}</p>
                    <p>{order.customerData.phone}</p>
                    <p>{order.customerData.country}</p>
                    <p>{order.customerData.address}</p>
                    <p>{order.customerData.postalCode} {order.customerData.city}</p>
                </section>
            </section>

            <section className="flex flex-col gap-4 mt-4">
                {order.products.map(product => {
                    return (
                        <section
                            key={product._id._id + product.sizeId}
                            className="flex gap-2">
                            <section className="w-[12em] h-[12em]">
                                <img
                                    className="w-full h-full object-cover rounded-sm"
                                    src={product._id.images[0]} alt="" />
                            </section>

                            <section className="p-4 text-stone-500">
                                <p className="uppercase font-semibold text-stone-900">{product._id.brand.name}</p>
                                <p>{product._id.category.name}</p>
                                <p className="">Size: {getSizeName(product.sizeId, product._id.variations).toUpperCase()}</p>
                                <p>Color: {product._id.color.name}</p>
                                <p>Cost: {product.quantity} x ${product._id.price.toFixed(2)}</p>
                                <p>Total: ${(product._id.price * product.quantity).toFixed(2)}</p>
                            </section>
                        </section>
                    )
                })}
            </section>
        </section>
    )
}

export const loader = async ({ request, params }) => {
    const { id: orderId } = params;
    const order = await fetch('http://localhost:3000/orders/' + orderId);


    return order;
}