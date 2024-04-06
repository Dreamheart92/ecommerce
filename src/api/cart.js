export const addCartToDb = (userId, cart) => {
    fetch(`http://localhost:3000/user/${userId}/cart`, {
        method: 'Post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(cart)
    })
}