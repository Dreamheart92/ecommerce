import { useNavigate } from "react-router-dom";
import Button from "../../Button.jsx";
import Order from "./Order.jsx";

export default function Orders({ orders }) {
    const navigate = useNavigate();

    const handleBackToShop = () => {
        navigate('/catalogue/all');
    }

    if (orders.length <= 0) {
        return (
            <section className="flex flex-col gap-4">
                <h1 className="font-semibold">You still do not have any purchases.</h1>
                <Button
                    onClick={handleBackToShop}
                >Back to shop</Button>
            </section>
        )
    }

    return (
        <section className="w-full">
            <h1 className="font-semibold text-xl">Orders</h1>
            <section className="w-full h-fit mt-2 flex flex-col gap-4">
                {orders.map(order => <Order key={order._id} order={order} />)}
            </section>
        </section>
    )
}