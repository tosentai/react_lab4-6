import { useState } from "react";

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodoTitle }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(todo.todo);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (editValue.trim() && editValue !== todo.todo) {
            editTodoTitle(todo.id, editValue.trim());
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSave();
        }
        if (e.key === "Escape") {
            setIsEditing(false);
            setEditValue(todo.todo);
        }
    };

    return (
        <li className="group flex items-center p-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-5 w-5 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <span className="ml-4 flex-grow text-lg">
                {isEditing ? (
                    <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="border px-2 py-1 rounded"
                        autoFocus
                        onBlur={handleSave}
                    />
                ) : (
                    <span
                        className={
                            todo.completed
                                ? "text-gray-400 line-through"
                                : "text-gray-700"
                        }
                    >
                        {todo.todo}
                    </span>
                )}
            </span>
            {!isEditing && (
                <button
                    onClick={handleEdit}
                    className="ml-2 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-indigo-600 transition-opacity"
                >
                    Edit
                </button>
            )}
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
