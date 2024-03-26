import useQuery from "../hooks/useQuery.js";
import Button from "./Button.jsx";

export default function CategoryCard({ category }) {
    return (
        <section
            className="relative">
            <div className="w-[35em] h-[50em] flex  flex-col items-center">
                <img className="w-full h-full object-cover cursor-pointer" src={category.imageUrl} alt="" />
                <div className=" text-stone-900 font-medium text-md py-2 uppercase">
                    <h1>{category.name}</h1>
                </div>
            </div>
        </section>
    )
}