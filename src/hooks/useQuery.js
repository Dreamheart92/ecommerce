import { useSearchParams } from "react-router-dom";

export default function useQuery() {
    const [searchParams, setSearchParams] = useSearchParams();

    const addQuery = ({ name, value }) => {
        const values = value.map(value => value.name);

        setSearchParams(previousParams => {
            previousParams.set(name, values.join('|'))
            return previousParams;
        })
    }

    return {
        searchParams,
        addQuery
    }
}