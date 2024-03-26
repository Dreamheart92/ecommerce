import Hero from "../components/Hero.jsx";
import Items from "../components/Items.jsx";
import Section from "../components/Section.jsx";
import CategoryCard from "../components/CategoryCard.jsx";

import { categories } from "../data.js";
import useHttp from "../hooks/useHttp.js";
import { apiEndpoints } from "../api/api-endpoints.js";


export default function Home() {
    const { data: items, isLoading, error } = useHttp(apiEndpoints.items.allProducts + '?page=1', []);

    return (
        <>
            <Hero />
            <Items label='New arrivals' isLoading={isLoading} items={items} />
            <Section>
                {categories.map(category => <CategoryCard key={category.name} category={category} />)}
            </Section>
        </>
    )
}