import { useState, useEffect } from "react";

function sendHttpRequest(url, config) {
    return fetch(url, config);
}

export default function useHttp(url, initialValue, config) {
    const [data, setData] = useState(initialValue);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    async function sendRequest(body) {
        try {
            setIsLoading(true);

            if (body) {
                config.body = JSON.stringify(body);
            }

            const response = await sendHttpRequest(url, config);
            const resData = await response.json();

            if (!response.ok) {
                const error = new Error('Request failed');
                error.data = resData;
                throw error;
            }

            setData(resData);
            setIsLoading(false);

        } catch (error) {
            setError(error.data);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!config) {
            sendRequest();
        }

    }, [url, config])

    const setCustomError = (error) => {
        setError(error);
    }

    return {
        data,
        isLoading,
        error,
        setCustomError,
        sendRequest
    }
}