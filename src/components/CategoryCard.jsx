import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
    return (
        <section className="w-full h-full relative">
            <Link to={`/catalogue/${category.name}`}>
                <section className="w-full h-full text-center cursor-pointer pb-4 relative">
                    <img className="w-full h-full object-cover object-center brightness-[0.80]" src={category.imageUrl} alt="" />
                    <div className="absolute top-[50%] translate-y-[-50%] flex flex-col items-center w-full text-white font-medium uppercase">
                        <h1 className="text-3xl">{category.name}</h1>
                        <button className="hover:underline">Shop now</button>
                    </div>
                </section>
            </Link>
        </section>
    )
}