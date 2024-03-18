import heroVideo from "../assets/videos/hero-video.mp4";

import Button from "./Button.jsx";

export default function Hero() {

    return (
        <section className="text-center w-full h-[57em]">
            <video className="w-full h-full absolute top-0 left-0 object-cover -z-10" muted autoPlay loop >
                <source src={heroVideo} type="video/mp4" />
            </video>

            <section>
                <h3 className="text-white text-5xl mt-[18%] pb-8">Autumn/Winter 2023 Womenswear </h3>
                <Button variant='secondary'>EXPLORE COLLECTION</Button>
            </section>
        </section>
    )
}