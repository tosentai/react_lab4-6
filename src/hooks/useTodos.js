import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

export const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(10);
    const [totalTodos, setTotalTodos] = useState(0);

    const [searchTerm, setSearchTerm] = useState("");

    const fetchTodos = useCallback(
        async (skip = 0, limit = limitPerPage) => {
            setIsLoading(true);
            try {
                const res = await axios.get(
                    `${API_URL}?limit=${limit}&skip=${skip}`
                );
                setTodos(res.data.todos);
                setTotalTodos(res.data.total);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        },
        [limitPerPage]
    );

    useEffect(() => {
        const skip = (currentPage - 1) * limitPerPage;
        fetchTodos(skip, limitPerPage);
    }, [currentPage, limitPerPage, fetchTodos]);

    const addTodo = useCallback((todoText) => {
        const newTodo = {
            id: Date.now(),
            todo: todoText,
            completed: false,
        };
        setTodos((prevTodos) => [newTodo, ...prevTodos]);
        setTotalTodos((prevTotal) => prevTotal + 1);
    }, []);

    const toggleTodo = useCallback(
        async (id) => {
            setTodos((prevTodos) =>
                prevTodos.map((t) =>
                    t.id === id ? { ...t, completed: !t.completed } : t
                )
            );
            try {
                if (typeof id === "number" && id < 1000000000000) {
                    const todoToToggle = todos.find((t) => t.id === id);
                    await axios.put(`${API_URL}/${id}`, {
                        completed: !todoToToggle.completed,
                    });
                }
            } catch (err) {
                setError(err.message);
            }
        },
        [todos]
    );

    const deleteTodo = useCallback(async (id) => {
        setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
        setTotalTodos((prevTotal) => prevTotal - 1);
        try {
            if (typeof id === "number" && id < 1000000000000) {
                await axios.delete(`${API_URL}/${id}`);
            }
        } catch (err) {
            setError(err.message);
        }
    }, []);

    const editTodoTitle = useCallback(async (id, newTitle) => {
        try {
            await axios.put(`${API_URL}/${id}`, { todo: newTitle });
            setTodos((prev) =>
                prev.map((t) => (t.id === id ? { ...t, todo: newTitle } : t))
            );
        } catch (err) {
            setError(err.message);
        }
    }, []);

    const goToNextPage = () => {
        if (currentPage < Math.ceil(totalTodos / limitPerPage)) {
            setCurrentPage((p) => p + 1);
        }
    };
    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((p) => p - 1);
        }
    };
    const setLimit = (limit) => {
        setLimitPerPage(limit);
        setCurrentPage(1);
    };

    const filteredTodos = searchTerm
        ? todos.filter((todo) =>
              todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : todos;

    return {
        todos: filteredTodos,
        isLoading,
        error,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodoTitle,
        currentPage,
        limitPerPage,
        totalTodos,
        goToNextPage,
        goToPrevPage,
        setLimit,
        searchTerm,
        setSearchTerm,
    };
};

export default useTodos;
