export default function Input({ label, error, size, ...props }) {
    let baseSize = 'w-[30em] h-[3em]';

    if (size) {
        baseSize = size;
    }

    return (
        <>
            {label &&
                <label htmlFor={label}>{label}</label>
            }
            <input
                {...props}
                className={`border border-stone-300 p-4 focus:bg-stone-100 focus:outline-none focus:border-stone-900 ${baseSize}`} />

            {error &&
                <p className="text-red-700 mt-2 text-sm">{error}</p>
            }
        </>
    )
}