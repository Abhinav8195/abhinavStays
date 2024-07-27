// hooks/useFetch.js
import axios from 'axios';
import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = localStorage.getItem("accessToken"); // Retrieve the token from local storage
            try {
                const res = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Set the Authorization header
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
        const token = localStorage.getItem("accessToken"); // Retrieve the token from local storage
        try {
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`, // Set the Authorization header
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
