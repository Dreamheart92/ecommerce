export const setUserData = (data) => {
    localStorage.setItem('session_data', JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));
}

export const clearUserData = () => {
    localStorage.clear('session_data');
    window.dispatchEvent(new Event('storage'));
}

export const getUserData = () => {
    const userData = localStorage.getItem('session_data');
    return JSON.parse(userData);
}