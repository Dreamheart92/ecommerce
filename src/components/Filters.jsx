import { useEffect, useRef, useState } from "react";

import useQuery from "../hooks/useQuery.js";
import Filter from "./Filter.jsx";

export const FILTERS_TYPES = {
    color: 'color',
    brand: 'brand',
    size: 'size',
    sortBy: 'sortBy'
}

const FILTERS_INITIAL_STATE = {
    [FILTERS_TYPES.color]: false,
    [FILTERS_TYPES.brand]: false,
    [FILTERS_TYPES.size]: false,
    [FILTERS_TYPES.sortBy]: false
}

export default function Filters({ filters, sortByOptions }) {
    const section = useRef();
    const [color, brand, size] = filters;
    const { addQuery, clearQuery } = useQuery();

    const [filtersState, setFiltersState] = useState(FILTERS_INITIAL_STATE);

    const handleToggleFilter = (filterType) => {
        setFiltersState(prevState => {
            const isFilterShown = !prevState[filterType];

            if (isFilterShown) {
                return {
                    ...FILTERS_INITIAL_STATE,
                    [filterType]: isFilterShown
                }
            } else {
                return {
                    ...prevState,
                    [filterType]: !prevState[filterType]
                }
            }
        })
    }

    const handleQuery = (type, value) => {
        addQuery(type, value);
    }

    useEffect(() => {
        const closeFilters = (event) => {
            const isClickedOnFilters = event.target.contains(section.current);

            if (isClickedOnFilters) {
                setFiltersState(FILTERS_INITIAL_STATE);
            }
        }

        document.addEventListener('click', closeFilters);

        return () => {
            clearQuery();
            document.removeEventListener('click', closeFilters);
        }
    }, []);

    return (
        <section className="w-full flex justify-between">
            <section
                ref={section}
                className="w-[80%] flex gap-4">
                <Filter
                    data={size}
                    handleQuery={handleQuery}
                    label={FILTERS_TYPES.size}
                    open={filtersState[FILTERS_TYPES.size]}
                    onClick={() => handleToggleFilter(FILTERS_TYPES.size)}>
                </Filter>

                <Filter
                    data={color}
                    handleQuery={handleQuery}
                    open={filtersState[FILTERS_TYPES.color]}
                    onClick={() => handleToggleFilter(FILTERS_TYPES.color)}
                    label={FILTERS_TYPES.color}>
                </Filter>

                <Filter
                    data={brand}
                    handleQuery={handleQuery}
                    open={filtersState[FILTERS_TYPES.brand]}
                    onClick={() => handleToggleFilter(FILTERS_TYPES.brand)}
                    label={FILTERS_TYPES.brand}>
                </Filter>
            </section>

            <section className="relative">
                <button
                    onClick={() => handleToggleFilter(FILTERS_TYPES.sortBy)}
                >Sort by</button>

                {filtersState[FILTERS_TYPES.sortBy] &&
                    <section className="absolute bg-white border border-stone-200 shadow-xl flex flex-col gap-2 w-[10em] items-center justify-center">
                        {sortByOptions.map(sort => {
                            const [query, { name, selected }] = Object.entries(sort)[0];
                            return (
                                <button
                                    className={`hover:bg-stone-100 px-2 py-2 w-full ${sort.selected ? 'bg-stone-100' : null}`}
                                    key={name}
                                    onClick={() => handleQuery('sortBy', query)}>
                                    {name}
                                </button>
                            )
                        })}
                    </section>
                }
            </section>
        </section>
    )
}