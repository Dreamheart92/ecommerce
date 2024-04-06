export default function Filter({ open, label, data, handleQuery, ...props }) {
    return (
        <section className="relative filter">
            <button {...props} className={`cursor-pointer hover:text-stone-900 first-letter:uppercase ${open ? 'text-stone-900' : 'text-stone-400'}`}>{label}</button>
            {open &&
                <section className="absolute w-[20em] h-fit max-h-[12em] bg-white border border-stone-100 shadow-xl flex flex-wrap flex-col gap-2 p-4">
                    {data.filters.map(filter => {
                        return <div key={filter.id}
                            onClick={() => handleQuery(label, filter.name)}
                            className={`bg-stone-100 p-2 flex items-center justify-center text-sm cursor-pointer hover:bg-stone-200 ${filter.selected ? 'border border-stone-300 bg-stone-200' : null} `}>
                            <span className="uppercase">{filter.name}</span>
                        </div>
                    })}
                </section>}
        </section>
    )
}