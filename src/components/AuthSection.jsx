export default function AuthSection({ title, caption, children }) {
    return (
        <section className="w-full h-screen bg-stone-50">
            <section className="flex flex-col pt-[10%] gap-2 items-center">
                <section className="flex flex-col gap-2 mb-2">
                    <h1 className="text-center font-bold text-xl uppercase tracking-widest">{title}</h1>
                    <p>{caption}</p>
                </section>
                {children}
            </section>
        </section>
    )
}