import FilterArrow from "./FilterArrow.jsx";

export default function Filter({ open, label, data, handleQuery, ...props }) {
    return (
        <section className="">
            <section  {...props} className="flex items-center gap-1 cursor-pointer">
                <button className="first-letter:uppercase">{label}</button>
                <FilterArrow open={open} />
            </section>

            {open &&
                <section className="flex absolute w-fit border bg-white p-3 gap-1 flex-wrap max-w-[21em] z-50">
                    {data.filters.map(filter =>
                        <button
                            key={filter.id}
                            onClick={() => handleQuery(label, filter.name)}
                            className={`bg-stone-100 uppercase
                            p-2 flex items-center justify-center text-sm cursor-pointer hover:bg-stone-200 
                            ${filter.selected ? 'bg-stone-900 text-white hover:bg-stone-700' : null}`}>
                            {filter.name}</button>)}
                </section>}
        </section>
    )
}

/*
export default function Filter({ open, label, data, handleQuery, ...props }) {
    return (
        <section className="relative filter z-50">
            <button {...props} className={`cursor-pointer hover:text-stone-900 first-letter:uppercase ${open ? 'text-stone-900' : 'text-stone-400'}`}>{label}</button>
            {open &&
                <section className="absolute h-fit max-h-[24em] bg-white border border-stone-100 shadow-xl flex flex-wrap flex-col gap-2 p-4">
                    {data.filters.map(filter => {
                        return <div key={filter.id}
                            onClick={() => handleQuery(label, filter.name)}
                            className={`bg-stone-100 
                            p-2 flex items-center justify-center text-sm cursor-pointer hover:bg-stone-200 
                            ${filter.selected ? 'border border-stone-300 bg-stone-200' : null}
                            w-fit p-4
                            `}>
                            <span className="uppercase">{filter.name}</span>
                        </div>
                    })}
                </section>}
        </section>
    )
}
*/