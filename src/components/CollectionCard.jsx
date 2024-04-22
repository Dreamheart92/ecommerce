import { Link } from "react-router-dom";

export default function CollectionCard({ collection, labelFontSize = '3xl' }) {
    const labelStyle = `text-${labelFontSize} font-bold`

    return (
        <section className="w-full h-full relative">
            <Link to={collection.name || '/catalogue/all'}>
                <img
                    className="w-full h-full object-cover object-center brightness-[.85]"
                    src={collection.imageUrl} alt="" />

                <div className="absolute top-[50%]  text-white flex flex-col items-center text-center w-full">
                    <h1 className={labelStyle}>{collection.name || 'Collection'}</h1>
                    <p className="px-1">{collection.caption || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, provident.'}</p>
                    <button className="mt-2 underline">Shop now</button>
                </div>
            </Link>
        </section>
    )
}