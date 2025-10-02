import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

export const useTodos = (completedFilter = "all") => {
    const [allTodos, setAllTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

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

    const filteredTodos = useMemo(() => {
        let filtered = allTodos;

        if (searchTerm.trim()) {
            filtered = filtered.filter((todo) =>
                todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (completedFilter === "active") {
            filtered = filtered.filter((todo) => !todo.completed);
        } else if (completedFilter === "done") {
            filtered = filtered.filter((todo) => todo.completed);
        }

        return filtered;
    }, [allTodos, searchTerm, completedFilter]);

    const paginatedTodos = useMemo(() => {
        const startIndex = (currentPage - 1) * limitPerPage;
        const endIndex = startIndex + limitPerPage;
        return filteredTodos.slice(startIndex, endIndex);
    }, [filteredTodos, currentPage, limitPerPage]);

    const totalTodos = filteredTodos.length;
    const totalPages = Math.ceil(totalTodos / limitPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, completedFilter]);

    const handleSearchTermChange = useCallback((term) => {
        setSearchTerm(term);
    }, []);

    const addTodo = useCallback((todoText) => {
        const newTodo = {
            id: Date.now(),
            todo: todoText,
            completed: false,
            userId: 1,
        };
        setAllTodos((prevTodos) => [newTodo, ...prevTodos]);
    }, []);

    const toggleTodo = useCallback(
        async (id) => {
            setAllTodos((prevTodos) =>
                prevTodos.map((t) =>
                    t.id === id ? { ...t, completed: !t.completed } : t
                )
            );

            try {
                if (typeof id === "number" && id < 1000000000000) {
                    const todoToToggle = allTodos.find((t) => t.id === id);
                    await axios.put(`${API_URL}/${id}`, {
                        completed: !todoToToggle.completed,
                    });
                }
            } catch (err) {
                setAllTodos((prevTodos) =>
                    prevTodos.map((t) =>
                        t.id === id ? { ...t, completed: !t.completed } : t
                    )
                );
                setError(err.message);
            }
        },
        [allTodos]
    );

    const deleteTodo = useCallback(async (id) => {
        setAllTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));

        try {
            if (typeof id === "number" && id < 1000000000000) {
                await axios.delete(`${API_URL}/${id}`);
            }
        } catch (err) {
            setError(err.message);
        }
    }, []);

    const editTodoTitle = useCallback(
        async (id, newTitle) => {
            const oldTodo = allTodos.find((t) => t.id === id);

            setAllTodos((prev) =>
                prev.map((t) => (t.id === id ? { ...t, todo: newTitle } : t))
            );

            if (typeof id === "number" && id < 1000000000000) {
                try {
                    await axios.put(`${API_URL}/${id}`, { todo: newTitle });
                    setError(null);
                } catch (err) {
                    setAllTodos((prev) =>
                        prev.map((t) => (t.id === id ? oldTodo : t))
                    );
                    setError(err.message);
                }
            }
        },
        [allTodos]
    );

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((p) => p + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((p) => p - 1);
        }
    };

    const goToPage = (page) => {
        const pageNumber = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(pageNumber);
    };

    const setLimit = (limit) => {
        setLimitPerPage(limit);
        setCurrentPage(1);
    };

    return {
        todos: paginatedTodos,
        isLoading,
        error,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodoTitle,
        currentPage,
        limitPerPage,
        totalTodos,
        totalPages,
        goToNextPage,
        goToPrevPage,
        goToPage,
        setLimit,
        searchTerm,
        setSearchTerm: handleSearchTermChange,
    };
};

export default useTodos;
