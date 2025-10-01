const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
    return (
        <li className="group flex items-center p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-5 w-5 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <span
                className={`ml-4 flex-grow text-lg ${
                    todo.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-700"
                }`}
            >
                {todo.todo}
            </span>
            <button
                onClick={() => deleteTodo(todo.id)}
                className="ml-4 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
            >
                &#x2715;
            </button>
        </li>
    );
};

export default TodoItem;
