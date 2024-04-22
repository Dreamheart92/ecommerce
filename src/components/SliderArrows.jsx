import { useContext } from "react"
import { useWindowSize } from "../hooks/useWindowSize.js";
import { SliderContext } from "../context/SliderContext.jsx"

const arrowStyle = 'w-11 h-11 px-3 py-3 cursor-pointer border rounded-full hover:bg-stone-900 hover:text-white';

export default function SliderArrows() {
    const { isOnMobile } = useWindowSize();
    const sliderContext = useContext(SliderContext);

    const handleScroll = (direction) => {
        sliderContext.onSlide(direction);
    }

    if (!isOnMobile) {
        return (
            <section className="flex gap-4 w-full justify-center z-50">
                <svg
                    onClick={() => handleScroll('left')}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    className={arrowStyle}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>

                <svg
                    onClick={() => handleScroll('right')}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    className={arrowStyle}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </section>
        )
    }
}