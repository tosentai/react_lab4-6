import { useMemo } from "react";

export const useTodosFilter = (allTodos, searchTerm, completedFilter) => {
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

    return filteredTodos;
};
