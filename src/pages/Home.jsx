import Hero from "../components/Hero.jsx";
import Slider from "../components/Slider.jsx";
import CategoryCard from "../components/CategoryCard.jsx";

import { categories, collections } from "../data.js";
import { apiEndpoints } from "../api/api-endpoints.js";
import { useLoaderData } from "react-router-dom";

import SliderContextProvider from "../context/SliderContext.jsx";
import SliderArrows from "../components/SliderArrows.jsx";
import CollectionCard from "../components/CollectionCard.jsx";

export default function Home() {
    const [items, goingCoastalCollection] = useLoaderData();

    return (
        <>
            <Hero />

            <SliderContextProvider>
                <section className="w-[95%] lg:w-[80%] h-full justify-center items-center mt-4">
                    <section className="flex flex-col w-full h-full text-center px-4 text-[1.1em] lg:text-[.85em] text-stone-900 gap-1 font-semibold mb-6">
                        <p className="font-bold text-xl mb-2">New arrivals</p>
                        <p className="">Step into style with our stunning new arrivals! 💃 Discover the latest trends and elevate your wardrobe with elegance and flair. #FashionForward</p>
                    </section>

                    <section className="w-full h-full flex flex-col items-center justify-center">
                        <Slider items={items} />
                        <SliderArrows />
                    </section>
                </section>
            </SliderContextProvider>

            <section className="w-full h-full mt-12">
                <section className="w-full flex flex-col md:flex-row justify-center gap-2">
                    {collections.map(collection => {
                        return (
                            <section
                                key={collection.imageUrl}
                                className="w-full h-full relative">
                                <CollectionCard collection={collection} />
                            </section>
                        )
                    })}
                </section>
            </section>

            <section className="w-full h-full flex flex-col lg:flex-row items-center lg:justify-end text-center mt-12 ">
                <SliderContextProvider>
                    <section className="mb-4 w-full lg:w-[25%]">
                        <h1 className="text-xl font-bold mb-1">Going Coastal</h1>
                        <p className="px-12 mb-5">Lost in the serenity of the sea, &apos;Going Coastal&apos; captures nature&apos;s beauty in every stitch.</p>
                        <SliderArrows />
                    </section>

                    <section className="w-[95%] lg:w-[70%] h-full ">
                        <Slider items={goingCoastalCollection} />
                    </section>
                </SliderContextProvider>
            </section>

            <section className="w-full mt-8">
                <section className="w-full h-full grid lg:grid-cols-3 lg:gap-[.15em]">
                    {categories.map(category =>
                        <section
                            key={category.name}
                            className="w-full h-full lg:max-h-[45em]"
                        >
                            <CategoryCard category={category} />
                        </section>
                    )}
                </section>
            </section>


        </>
    )
}

export const loader = async () => {
    const items = fetch(apiEndpoints.items.allProducts + '?page=1').then(response => response.json());
    const goingCoastalCollection = fetch(apiEndpoints.collections.goingCoastal).then(response => response.json());

    return Promise.all([items, goingCoastalCollection]);
}