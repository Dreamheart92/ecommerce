import { useEffect, useState } from "react";
import useQuery from "../hooks/useQuery.js"

let isFirstRender = true;

export default function Filters({ variations, brands, colors }) {
    const { addQuery } = useQuery();

    const [variationsFilters, setVariationsFilters] = useState();

    useEffect(() => {
        if (variations !== undefined) {
            setVariationsFilters(variations.map(variation => {
                return {
                    ...variation,
                    selected: false
                }
            }))
        }
    }, [variations])

    useEffect(() => {
        if (isFirstRender) {
            isFirstRender = false;
            return;
        }

        if (variationsFilters !== undefined) {

            const getSelectedFilters = variationsFilters?.filter(variation => variation.selected);
            addQuery({ name: 'size', value: getSelectedFilters });
        }
    }, [variationsFilters])

    const handleSelect = (filter) => {
        setVariationsFilters(prevFilters => {
            const newFilters = [...prevFilters];
            const findFilter = prevFilters.find(variation => variation.name === filter.name);
            findFilter.selected = !findFilter.selected;
            return newFilters;
        })
    }

    return (
        <section>
            {variations &&
                <section className="flex gap-2">
                    {variations.map(variation => {
                        return <div key={variation.id} onClick={() => handleSelect(variation)} className="w-4 h-4 bg-stone-200 p-4 flex items-center justify-center text-sm cursor-pointer">
                            <span className="uppercase">{variation.name}</span>
                        </div>
                    })}
                </section>
            }
        </section>
    )
}