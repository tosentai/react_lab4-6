import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import TodoHeader from "../components/TodoHeader";
import TodoFilters from "../components/TodoFilters";
import TodoStats from "../components/TodoStats";
import SearchAndLimit from "../components/SearchAndLimit";
import PaginationControls from "../components/PaginationControls";

const HomePage = () => {
    const {
        todos,
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
    } = useTodos();

    const [filter, setFilter] = useState("all");
    const activeCount = todos.filter((t) => !t.completed).length;

    const handleFilter = (todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "done") return todo.completed;
        return true;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl">
                <TodoHeader />
                <AddTodoForm addTodo={addTodo} isLoading={isLoading} />

                <SearchAndLimit
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    limitPerPage={limitPerPage}
                    setLimit={setLimit}
                />

                {isLoading && (
                    <p className="text-center text-gray-500 py-4">
                        Loading tasks...
                    </p>
                )}
                {error && (
                    <p className="text-center text-red-500 py-4">
                        Error: {error}
                    </p>
                )}

                {!isLoading && !error && (
                    <div className="mt-4 border-t border-gray-200">
                        <TodoList
                            todos={todos.filter(handleFilter)}
                            toggleTodo={toggleTodo}
                            deleteTodo={deleteTodo}
                            editTodoTitle={editTodoTitle}
                        />
                    </div>
                )}

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <TodoStats count={activeCount} />
                    <TodoFilters activeFilter={filter} setFilter={setFilter} />
                    <PaginationControls
                        currentPage={currentPage}
                        totalTodos={totalTodos}
                        limitPerPage={limitPerPage}
                        goToNextPage={goToNextPage}
                        goToPrevPage={goToPrevPage}
                    />
                    <span>({totalTodos} total)</span>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
