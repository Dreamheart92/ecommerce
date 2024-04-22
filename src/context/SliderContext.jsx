import { createContext, useState } from "react";

export const SliderContext = createContext();

export default function SliderContextProvider({ children }) {
    const [slider, setSlider] = useState(null);

    const onSlide = (direction) => {
        setSlider(direction);

        setTimeout(() => {
            setSlider(null);
        }, 100)
    }

    const sliderContext = {
        slider,
        onSlide
    }

    return (
        <SliderContext.Provider value={sliderContext}>
            {children}
        </SliderContext.Provider>
    )
}