export const addCartToDb = (userId, cart) => {
    fetch(`http://192.168.0.189:3000/user/${userId}/cart`, {
        method: 'Post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(cart)
    })
}