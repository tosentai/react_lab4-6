import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

const fetchTodosAPI = async () => {
    const response = await axios.get(`${API_URL}?limit=10`);
    return response.data.todos;
};

const updateTodoAPI = async (updatedTodo) => {
    const response = await axios.put(`${API_URL}/${updatedTodo.id}`, {
        completed: updatedTodo.completed,
    });
    return response.data;
};

const deleteTodoAPI = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTodos = async () => {
            try {
                setIsLoading(true);
                const fetchedTodos = await fetchTodosAPI();
                setTodos(fetchedTodos);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        loadTodos();
    }, []);

    const addTodo = useCallback((todoText) => {
        const newTodo = {
            id: Date.now(),
            todo: todoText,
            completed: false,
        };
        setTodos((prevTodos) => [newTodo, ...prevTodos]);
    }, []);

    const toggleTodo = useCallback(
        async (id) => {
            const originalTodos = [...todos];
            const todoToToggle = todos.find((t) => t.id === id);
            if (!todoToToggle) return;

            setTodos((prevTodos) =>
                prevTodos.map((t) =>
                    t.id === id ? { ...t, completed: !t.completed } : t
                )
            );

            try {
                if (id < 1000) {
                    await updateTodoAPI({
                        id,
                        completed: !todoToToggle.completed,
                    });
                }
            } catch (err) {
                setError(err.message);
                setTodos(originalTodos);
            }
        },
        [todos]
    );

    const deleteTodo = useCallback(
        async (id) => {
            const originalTodos = [...todos];
            setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));

            try {
                if (id < 1000) {
                    await deleteTodoAPI(id);
                }
            } catch (err) {
                setError(err.message);
                setTodos(originalTodos);
            }
        },
        [todos]
    );

    return {
        todos,
        isLoading,
        error,
        addTodo,
        toggleTodo,
        deleteTodo,
        setTodos,
    };
};
