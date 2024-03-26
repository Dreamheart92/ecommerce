const baseUrl = 'http://localhost:3000';

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
}