const baseUrl = 'http://192.168.0.189:3000';

export const apiEndpoints = {
    auth: {
        login: baseUrl + '/login',
        register: baseUrl + '/signup'
    },
    items: {
        item: baseUrl + '/product',
        allProducts: baseUrl + '/products/all',
        productsCategory: baseUrl + '/products'
    },
    order: {
        createOrder: baseUrl + '/orders'
    },
    collections: {
        goingCoastal: baseUrl + '/collection/662007ecc7c9dab39f3cc2d0'
    }
}