import { Outlet, useLocation } from "react-router-dom";

import Header from "./components/Header.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import Cart from "./components/Cart.jsx";

function App() {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <CartContextProvider>
      <main className="w-full h-full flex flex-col items-center">
        <Header isHomePage={isHomePage} />
        <Cart />
        <Outlet />
      </main>
    </CartContextProvider>
  )
}
export default App;