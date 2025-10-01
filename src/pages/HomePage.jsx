import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import TodoHeader from "../components/TodoHeader";
import TodoFilters from "../components/TodoFilters";
import TodoStats from "../components/TodoStats";

const HomePage = () => {
    const { todos, isLoading, error, addTodo, toggleTodo, deleteTodo } =
        useTodos();
    const [filter, setFilter] = useState("all");

    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "done") return todo.completed;
        return true;
    });

    const activeCount = todos.filter((t) => !t.completed).length;

    const clearCompleted = () => {
        const completedTodos = todos.filter((todo) => todo.completed);
        completedTodos.forEach((todo) => deleteTodo(todo.id));
    };

    return (
        <div className="bg-white rounded-lg shadow-xl p-6">
            <TodoHeader />
            <AddTodoForm addTodo={addTodo} />

            {isLoading && (
                <p className="text-center text-gray-500 py-4">
                    Loading tasks...
                </p>
            )}
            {error && (
                <p className="text-center text-red-500 py-4">Error: {error}</p>
            )}

            {!isLoading && !error && (
                <>
                    <div className="mt-4 border-t border-gray-200">
                        <TodoList
                            todos={filteredTodos}
                            toggleTodo={toggleTodo}
                            deleteTodo={deleteTodo}
                        />
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                        <TodoStats count={activeCount} />
                        <TodoFilters
                            activeFilter={filter}
                            setFilter={setFilter}
                        />
                        <button
                            onClick={clearCompleted}
                            className="hover:text-red-500"
                        >
                            Clear Completed
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default HomePage;
