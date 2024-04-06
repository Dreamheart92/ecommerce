import { useLoaderData } from "react-router-dom";

import Card from "../components/Card.jsx";

export default function SearchPage() {
    const { results, searchQuery } = useLoaderData();

    return (
        <section
            className="flex flex-col items-center w-[80%]">

            <section className="flex flex-col items-center gap-2 p-4 w-[50%] text-center">
                <h1>search "{searchQuery}"</h1>
            </section>

            <section className="w-full h-full grid grid-cols-3 gap-4">
                {results?.map(item => <Card key={item?._id} className='w-[31em] h-[45em]' item={item} />)}
            </section>
        </section>
    )
}

export const loader = async ({ request, params }) => {
    const searchQuery = new URL(request.url).searchParams.get('query');
    const response = await fetch('http://localhost:3000/products?search=' + searchQuery);
    const results = await response.json();

    return { results, searchQuery };
}