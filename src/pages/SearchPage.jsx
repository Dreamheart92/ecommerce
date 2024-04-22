import { useLoaderData } from "react-router-dom";

import Card from "../components/Card.jsx";
import GridProducts from "../components/GridProducts.jsx";
import Layout from "../components/Layout.jsx";

export default function SearchPage() {
    const { results, searchQuery } = useLoaderData();

    return (
        <Layout>
            <section className="flex flex-col items-center gap-2 p-4 w-[50%] text-center">
                <h1>search "{searchQuery}"</h1>
            </section>
            <GridProducts items={results} />
        </Layout>
    )
}

export const loader = async ({ request, params }) => {
    const searchQuery = new URL(request.url).searchParams.get('query');
    const response = await fetch('http://192.168.0.189:3000/products?search=' + searchQuery);
    const results = await response.json();

    return { results, searchQuery };
}