import { useParams, useSearchParams } from "react-router-dom";
import useHttp from "../hooks/useHttp.js";

import { apiEndpoints } from "../api/api-endpoints.js";

import Card from "../components/Card.jsx";
import Filters from "../components/Filters.jsx";

export default function Catalogue() {
    const [searchParams] = useSearchParams();
    const { category } = useParams();

    const sizeQuery = searchParams.get('size');

    const { data: items, isLoading, error } = useHttp(apiEndpoints.items.productsCategory + '/' + category + `?size=${sizeQuery}`);
    const { data: filters, isLoading: isFiltersLoading } = useHttp('http://localhost:3000/filters/' + category);

    return (
        <section className="flex flex-col items-center w-[80%]">
            <section className="flex flex-col items-center gap-2 p-4 w-[50%] text-center">
                <h1>Category name</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores unde, suscipit nemo maiores optio, libero possimus quia alias sed earum dicta rem labore officia necessitatibus. Deserunt a laborum nemo non!</p>
            </section>

            <section className="flex justify-between px-4 py-4 w-full">
                <p>Filters</p>
                <Filters {...filters} />
                <p>Sort by</p>
            </section>

            <section className="w-full h-full grid grid-cols-3 gap-4">
                {items?.map(item => <Card key={item?._id} className='w-[31em] h-[45em]' item={item} />)}
            </section>
        </section>
    )
}