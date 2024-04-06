import Hero from "../components/Hero.jsx";
import Items from "../components/Items.jsx";
import Section from "../components/Section.jsx";
import CategoryCard from "../components/CategoryCard.jsx";

import { categories } from "../data.js";
import { apiEndpoints } from "../api/api-endpoints.js";
import { useLoaderData } from "react-router-dom";

export default function Home() {
    const items = useLoaderData();

    return (
        <>
            <Hero />
            <Items label='New arrivals' items={items} />
            <Section>
                {categories.map(category => <CategoryCard key={category.name} category={category} />)}
            </Section>
        </>
    )
}

export const loader = async () => {
    const items = fetch(apiEndpoints.items.allProducts + '?page=1').then(response => response.json());

    return items;
}