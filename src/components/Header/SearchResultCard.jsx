import { Link } from "react-router-dom";

const descriptionMaxLength = 50;

export default function SearchResultCard({ result }) {
    const convertDescription = result.description.length > descriptionMaxLength ? result.description.slice(0, descriptionMaxLength) + '...' : result.description.length;

    return (
        <section className="flex gap-4 w-[30em] hover:bg-stone-100 cursor-pointer">
            <Link
                className="flex gap-4"
                to={'/details/' + result._id}>
                <section className="w-[6em] h-[8em]">
                    <img className="w-full h-full object-cover object-center rounded-sm" src={result.images[0]} alt="" />
                </section>

                <section className="flex flex-col justify-center">
                    <h1 className="font-bold text-sm">{result.name}</h1>
                    <p className="text-sm">{convertDescription}</p>
                </section>
            </Link>
        </section>
    )
}