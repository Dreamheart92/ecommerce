import { useLoaderData } from "react-router-dom";

import { apiEndpoints } from "../api/api-endpoints.js";

import Card from "../components/Card.jsx";
import Filters from "../components/Filters.jsx";

export default function Catalogue() {
    const [items, filters, sortByOptions] = useLoaderData();

    return (
        <section
            className="flex flex-col items-center w-[80%]">

            <section className="flex flex-col items-center gap-2 p-4 w-[50%] text-center">
                <h1>Category name</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores unde, suscipit nemo maiores optio, libero possimus quia alias sed earum dicta rem labore officia necessitatibus. Deserunt a laborum nemo non!</p>
            </section>

            <section className="p-4 w-full flex justify-between">
                <Filters
                    sortByOptions={sortByOptions}
                    filters={filters} />
            </section>

            <section className="w-full h-full grid grid-cols-3 gap-4">
                {items?.map(item => <Card key={item?._id} className='w-[31em] h-[45em]' item={item} />)}
            </section>
        </section>
    )
}

export const loader = async ({ request, params }) => {
    const SORT_BY_OPTIONS = [
        {
            'price-high': {
                name: 'Highest Price',
                selected: false
            },
        },
        {
            'price-low': {
                name: 'Lowest Price',
                selected: false
            },
        },
        {
            'newest': {
                name: 'Newest',
                selected: false
            }
        },
        {
            'oldest': {
                name: 'Oldest',
                selected: false
            }
        }]


    const { category } = params;
    const url = new URL(request.url);

    const searchParams = url.searchParams;
    const searchParamsEntries = searchParams.entries();
    const searchParamsLength = searchParams.size - 1;

    const queryString = searchParamsEntries.reduce((queryAcc, [queryName, queryValue], index) => {
        const isLastQuery = index === searchParamsLength ? '' : '&';
        return queryAcc += queryName + '=' + queryValue + isLastQuery;
    }, '')

    const itemsPromise = fetch(apiEndpoints.items.productsCategory + '/' + category + '?' + queryString).then(response => response.json());
    const filtersPromise = fetch('http://localhost:3000/filters/' + category + '?' + queryString).then(response => response.json());

    const filters = await filtersPromise;
    const sortByQuery = searchParams.get('sortBy');

    const convertedFilters = filters.map(({ name, filters }) => {
        const isInQuery = searchParams.has(name);
        const querySearchValues = isInQuery ? searchParams.get(name).split('|') : null;

        return {
            name,
            filters: filters.map(filter => {
                const isFilterSelected = isInQuery ? querySearchValues.includes(filter.name) : null;
                return {
                    ...filter,
                    selected: isInQuery && isFilterSelected ? true : false
                }
            }).sort((a, b) => a.name.localeCompare(b.name))
        }
    })

    if (sortByQuery) {
        SORT_BY_OPTIONS.forEach(sort => {
            if (sortByQuery === Object.keys(sort)[0]) {
                sort.selected = true
            } else {
                sort.selected = false
            }
        })
    }

    const sortedSortBy = SORT_BY_OPTIONS.sort((a, b) => b.selected - a.selected);

    return await Promise.all([itemsPromise, convertedFilters, sortedSortBy]);
}