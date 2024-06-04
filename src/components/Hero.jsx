// import heroVideo from "../assets/videos/hero-video.mp4";
import heroVideo from "../assets/videos/test1.mp4"

export default function Hero() {

    return (
        <section className="w-full h-full relative">
            <video className="w-full h-[50em] 2xl:h-screen object-cover object-center" muted autoPlay loop >
                <source src={heroVideo} type="video/mp4" />
            </video>

            <section className="absolute w-full h-full top-[50%] left-0 flex flex-col items-center gap-4">
                <h3 className="text-white text-xl 2xl:text-5xl">Spring/Summer 2024 Womenswear </h3>
                {/* <Button variant='secondary'>EXPLORE COLLECTION</Button> */}
                <button className="text-white underline">EXPLORE COLLECTION</button>
            </section>
        </section>
    )
}