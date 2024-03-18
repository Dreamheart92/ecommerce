import { useState, useEffect } from "react";

function sendHttpRequest(url, config) {
    return fetch(url, config);
}

export default function useHttp(url, initialValue, config) {
    const [data, setData] = useState(initialValue);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    async function sendRequest() {
        try {
            setIsLoading(true);
            const response = await sendHttpRequest(url, config);
            const resData = await response.json();

            if (!response.ok) {
                throw new Error(resData.message || 'Something went wrong. Please try again later.');
            }

            setData(resData);
            setIsLoading(false);

        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        sendRequest();

    }, [url, config])

    return {
        data,
        isLoading,
        error,
        sendRequest
    }
}