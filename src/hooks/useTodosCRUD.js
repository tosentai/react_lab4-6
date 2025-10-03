import { useCallback } from "react";
import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

export const useTodosCRUD = (allTodos, setAllTodos, setError) => {
    const addTodo = useCallback(
        (todoText) => {
            const newTodo = {
                id: Date.now(),
                todo: todoText,
                completed: false,
                userId: 1,
            };
            setAllTodos((prevTodos) => [newTodo, ...prevTodos]);
        },
        [setAllTodos]
    );

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
        [allTodos, setAllTodos, setError]
    );

    const deleteTodo = useCallback(
        async (id) => {
            setAllTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));

            try {
                if (typeof id === "number" && id < 1000000000000) {
                    await axios.delete(`${API_URL}/${id}`);
                }
            } catch (err) {
                setError(err.message);
            }
        },
        [setAllTodos, setError]
    );

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
        [allTodos, setAllTodos, setError]
    );

    return { addTodo, toggleTodo, deleteTodo, editTodoTitle };
};
