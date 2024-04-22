export default function Section({ children }) {
    return (
        <>
            <section className="flex w-full h-full justify-center gap-4 mt-10  flex-wrap 2xl:flex-nowrap">
                {children}
            </section>
        </>
    )
}