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
    const [filter, setFilter] = useState("all");

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
        totalPages,
        goToNextPage,
        goToPrevPage,
        goToPage,
        setLimit,
        searchTerm,
        setSearchTerm,
    } = useTodos(filter);

    const activeCount = todos.filter((t) => !t.completed).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                <TodoHeader />

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl shadow-2xl p-8 space-y-8">
                    <AddTodoForm onAdd={addTodo} />

                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                        <TodoFilters
                            activeFilter={filter}
                            setFilter={setFilter}
                        />
                        <TodoStats
                            activeCount={activeCount}
                            totalCount={totalTodos}
                        />
                    </div>

                    <SearchAndLimit
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        limitPerPage={limitPerPage}
                        setLimit={setLimit}
                    />

                    {isLoading && (
                        <div className="text-center py-16 text-slate-400">
                            <div className="animate-spin rounded-full h-14 w-14 border-b-3 border-slate-400 mx-auto"></div>
                            <p className="mt-6 text-lg">Loading tasks...</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-900/20 border border-red-800/50 text-red-300 px-6 py-4 rounded-xl backdrop-blur-sm">
                            <p className="font-semibold">Error: {error}</p>
                        </div>
                    )}

                    {!isLoading && !error && (
                        <>
                            <TodoList
                                todos={todos}
                                onToggle={toggleTodo}
                                onDelete={deleteTodo}
                                onEdit={editTodoTitle}
                            />

                            <PaginationControls
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onNext={goToNextPage}
                                onPrev={goToPrevPage}
                                onGoToPage={goToPage}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
