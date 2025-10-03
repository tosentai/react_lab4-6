import { useState, useCallback, useEffect } from "react";
import { useTodosFetch } from "./useTodosFetch";
import { useTodosFilter } from "./useTodosFilter";
import { usePagination } from "./usePagination";
import { useTodosCRUD } from "./useTodosCRUD";

export const useTodos = (completedFilter = "all") => {
    const [searchTerm, setSearchTerm] = useState("");

    const { allTodos, setAllTodos, isLoading, error, setError } =
        useTodosFetch();

    const filteredTodos = useTodosFilter(allTodos, searchTerm, completedFilter);

    const {
        paginatedItems: paginatedTodos,
        currentPage,
        limitPerPage,
        totalPages,
        goToNextPage,
        goToPrevPage,
        goToPage,
        setLimit,
        resetPage,
    } = usePagination(filteredTodos);

    const { addTodo, toggleTodo, deleteTodo, editTodoTitle } = useTodosCRUD(
        allTodos,
        setAllTodos,
        setError
    );

    useEffect(() => {
        resetPage();
    }, [searchTerm, completedFilter]);

    const handleSearchTermChange = useCallback((term) => {
        setSearchTerm(term);
    }, []);

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
        totalTodos: filteredTodos.length,
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
