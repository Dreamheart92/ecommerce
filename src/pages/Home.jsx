import useHttp from "../hooks/useHttp.js";

import Hero from "../components/Hero.jsx";
import Items from "../components/Items.jsx";
import Section from "../components/Section.jsx";
import CategoryCard from "../components/CategoryCard.jsx";

import { categories } from "../data.js";

export default function Home() {
    const { data: items, isLoading, error } = useHttp('http://localhost:3000/products/all?page=1', []);

    return (
        <>
            <Hero />
            {!error && <Items label='New arrivals' isLoading={isLoading} items={items} />}
            <Section>
                {categories.map(category => <CategoryCard key={category.name} category={category} />)}
            </Section>
        </>
    )
}