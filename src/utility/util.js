export const submitHandler = (event) => {
    event.preventDefault();

    const fd = new FormData(event.currentTarget);
    const data = Object.fromEntries(fd.entries());

    return data;
}

export const httpConfig = (method) => {
    return {
        method,
        headers: {
            'Content-type': 'application/json'
        }
    }
}