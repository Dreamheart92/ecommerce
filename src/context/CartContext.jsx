import { createContext, useState } from "react";

const CartContext = createContext();

export function CartContextProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartShown, setIsCartShown] = useState(false);

    const addItemToCart = (item, selectedSize) => {
        setCartItems(prevItems => {
            const updatedItems = [...prevItems];
            const indexOfItem = updatedItems.findIndex(prevItem => prevItem._id === item._id && prevItem.size.id === selectedSize.id);

            if (indexOfItem === -1) {
                const newItem = {
                    _id: item._id,
                    name: item.name,
                    brand: item.brand,
                    price: item.price,
                    size: selectedSize,
                    image: item.images[0],
                    quantity: 1,
                }
                updatedItems.push(newItem);
            } else {
                const updatedItem = { ...updatedItems[indexOfItem] };
                updatedItem.quantity = updatedItem.quantity + 1
                updatedItems[indexOfItem] = updatedItem;
            }

            return updatedItems;
        })
    }

    const removeItemFromCart = (item) => {
        setCartItems(prevItems => {
            const newItems = [...prevItems];
            const indexOfItem = newItems.findIndex(prevItem => prevItem._id === item._id && prevItem.size.id === item.size.id);
            newItems.splice(indexOfItem, 1);
            return newItems;
        })
    }

    const incrementItem = (item) => {
        setCartItems(prevItems => {
            return prevItems.map(prevItem => {
                if (prevItem._id === item._id && prevItem.size.id === item.size.id) {
                    return {
                        ...prevItem,
                        quantity: prevItem.quantity + 1
                    }
                }

                return prevItem;
            })
        })
    }

    const decrementItem = (item) => {
        setCartItems(prevItems => {
            const newItems = [...prevItems];
            const indexOfItem = newItems.findIndex(prevItem => prevItem._id === item._id && prevItem.size.id === item.size.id);


            if (item.quantity - 1 <= 0) {
                newItems.splice(indexOfItem, 1);
            } else {
                const updatedItem = { ...newItems[indexOfItem] };
                updatedItem.quantity = updatedItem.quantity - 1;
                newItems[indexOfItem] = updatedItem;
            }

            return newItems;
        })
    }

    const handleCartState = (state) => {
        setIsCartShown(state);
    }


    const cartCtx = {
        cartItems,
        addItemToCart,
        removeItemFromCart,
        incrementItem,
        decrementItem,
        isCartShown,
        handleCartState
    };

    return (
        <CartContext.Provider value={cartCtx}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;