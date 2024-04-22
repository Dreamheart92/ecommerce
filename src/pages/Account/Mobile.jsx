import { Link, Outlet, useNavigate } from "react-router-dom";

import Orders from "../../components/Account/Order/Orders.jsx";
import Settings from "../../components/Account/Settings.jsx";
import Wishlist from "../../components/Account/Wishlist/Wishlist.jsx";

import { capitalizeFullName } from "../../utility/util.js";

const VIEW_TYPES = {
    dashboard: 'dashboard',
    settings: 'settings',
    orders: 'orders',
    wishlist: 'wishlist'
}

export default function Mobile({ handleLogout, activeView, userData, orderId, wishlist, onRemoveItemFromWishlist }) {
    const navigate = useNavigate();

    const menuItemStyle = 'cursor-pointer hover:bg-stone-100 py-2 border-b-[.05em] border-solid border-stone-200 text-xl';
    const fullName = capitalizeFullName(userData.firstName, userData.lastName);

    const caption = activeView !== 'dashboard' ? activeView[0].toUpperCase() + activeView.slice(1) : `Welcome, ${fullName}!`;

    return (
        <section className="w-full h-full mt-14">
            <section className="flex flex-col w-full mt-2 h-full">
                <section
                    id="welcome-account"
                    className="text-white h-[14em] flex flex-col justify-center items-center">
                    <h1 className="font-bold text-2xl mb-2">My account</h1>
                    <h1 className="text-xl">{caption}</h1>
                </section>

                {activeView !== VIEW_TYPES.dashboard &&
                    <section
                        onClick={() => navigate('/account/dashboard')}
                        className="flex items-center h-full ml-2 my-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                        <p>My account</p>
                    </section>
                }

                {activeView === VIEW_TYPES.dashboard &&
                    <section className="flex flex-col gap-4 w-full h-full p-4 justify-center">
                        {activeView === VIEW_TYPES.dashboard &&
                            <section className="flex flex-col">
                                <Link
                                    className={menuItemStyle}
                                    to={'/account/orders'}>
                                    <span>My orders</span>
                                    <p className="text-sm">Manage Your Orders: View Order Details with Ease.</p>
                                </Link>

                                <Link
                                    className={menuItemStyle}
                                    to={'/account/settings'}>
                                    <span>My settings</span>
                                    <p className="text-sm">Manage Your Account Settings: Customize Your Experience.</p>
                                </Link>

                                <Link
                                    className={menuItemStyle}
                                    to={'/account/wishlist'}>
                                    <span>My wishlist</span>
                                    <p className="text-sm">Your Wishlist: Crafting Your Dream Collection.</p>
                                </Link>

                                <span
                                    onClick={handleLogout}
                                    className={menuItemStyle}>Sign out</span>
                            </section>
                        }
                    </section>
                }

                {/* <section className="shadow-2xl rounded-xl p-4 border border-stone-200 ml-[2em] w-full flex"> */}
                <section className="w-full h-full flex items-center justify-center">
                    <Outlet />

                    {activeView === VIEW_TYPES.orders && !orderId &&
                        <Orders orders={userData.orders} />
                    }

                    {activeView === VIEW_TYPES.settings &&
                        <Settings
                            id={userData._id}
                            firstName={userData.firstName}
                            lastName={userData.lastName}
                            email={userData.email}
                        />
                    }

                    {activeView === VIEW_TYPES.wishlist &&
                        <Wishlist
                            wishlist={wishlist}
                            onRemoveItemFromWishlist={onRemoveItemFromWishlist}
                        />
                    }
                </section>
            </section>
        </section>
    )
}