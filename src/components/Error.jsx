export default function Error({ title, message }) {
    return (
        <section className="w-full h-full flex justify-center mt-12">
            <h1 className=" text-stone-900 font-bold text-xl">{title}</h1>
            <p>{message}</p>
        </section>
    )
}