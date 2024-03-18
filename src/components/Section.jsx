export default function Section({ children }) {
    return (
        <>
            <section className="flex w-full h-full justify-center gap-4 pt-24">
                {children}
            </section>
        </>
    )
}