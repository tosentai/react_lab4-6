import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

export const useTodosFetch = () => {
    const [allTodos, setAllTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllTodos = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${API_URL}?limit=0`);
            setAllTodos(res.data.todos);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllTodos();
    }, [fetchAllTodos]);

    return { allTodos, setAllTodos, isLoading, error, setError };
};
