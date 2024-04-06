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

export const capitalizeFullName = (firstName, lastName) => {
    return firstName[0].toUpperCase() + firstName.slice(1) + ' ' + lastName[0].toUpperCase() + lastName.slice(1);
}

export const convertDate = (dateString) => {
    const date = new Date(dateString);

    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return {
        date: day + ' ' + month[0].toUpperCase() + month.slice(1) + ' ' + year,
        time: hours + ':' + minutes + ':' + seconds
    }
}