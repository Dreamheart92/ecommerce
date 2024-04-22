import { useEffect, useState } from "react";

export function useWindowSize() {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const isOnMobile = innerWidth <= 1024;

    useEffect(() => {

        const setInnerWidthState = event => {
            setInnerWidth(event.target.innerWidth);
        }

        window.addEventListener('resize', setInnerWidthState);

        return () => {
            window.removeEventListener('resize', setInnerWidthState);
        }
    }, [])
    return { innerWidth, isOnMobile };
}