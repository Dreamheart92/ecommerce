import { useNavigate } from "react-router-dom";
import Button from "../../Button.jsx";
import Order from "./Order.jsx";
import { useWindowSize } from "../../../hooks/useWindowSize.js";

const mobileStyle = 'w-full h-full flex flex-col justify-center items-center gap-4';
const desktopStyle = 'w-full h-full flex flex-col gap-4';

export default function Orders({ orders }) {
    const navigate = useNavigate();

    const { isOnMobile } = useWindowSize();

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
        <section className={isOnMobile ? mobileStyle : desktopStyle}>
            {/* <h1 className="font-semibold text-xl">Orders</h1> */}
            {orders.map(order => <Order key={order._id} order={order} />)}
        </section>
    )
}