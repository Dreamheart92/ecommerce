import { useSearchParams } from "react-router-dom";

let queryState = {};

export default function useQuery() {
    const [searchParams, setSearchParams] = useSearchParams();

    const addQuery = (type, query) => {
        if (queryState.hasOwnProperty(type) && type !== 'sortBy') {
            const isAlreadyInQuery = queryState[type].findIndex(filter => filter === query);

            if (isAlreadyInQuery !== -1) {
                queryState[type].splice(isAlreadyInQuery, 1);
            } else {
                queryState[type].push(query);
            }
        } else {
            queryState[type] = [query];
        }

        setSearchParams(searchParams => {
            Object.entries(queryState).forEach(([queryName, queryValues]) => {
                searchParams.set(queryName, queryValues.join('|'));
            })

            return searchParams;
        })
    }

    const clearQuery = () => {
        queryState = {};
    }

    return {
        searchParams,
        clearQuery,
        addQuery
    }
}