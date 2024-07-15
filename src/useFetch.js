import { useEffect, useState } from "react";

function useFetch(url, additional = null,refresh ) {
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            },
            ...additional
        })
        .then(res => res.json())
        .then(data => {
            setData(data);
        })
        .catch(err => {
            setErrors(err);
        });
    }, [refresh]);

    return { data, errors };
}

export default useFetch;
