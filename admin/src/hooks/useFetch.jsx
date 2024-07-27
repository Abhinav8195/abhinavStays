import axios from 'axios';
import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = localStorage.getItem("accessToken"); // Get the access token

            try {
                const res = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the headers
                    },
                });
                setData(res.data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };

        fetchData();
    }, [url]);

    const reFetch = async () => {
        setLoading(true);
        const token = localStorage.getItem("accessToken"); // Get the access token

        try {
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the headers
                },
            });
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch };
};

export default useFetch;
