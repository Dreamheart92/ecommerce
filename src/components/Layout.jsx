export default function Layout({ children }) {
    return (
        <section className="h-full mt-20 flex flex-col w-[95%] lg:w-[80%] items-center">
            {children}
        </section>
    )
}