import { useState } from "react";

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.todo);

    const handleEdit = () => {
        if (editText.trim() && editText !== todo.todo) {
            onEdit(todo.id, editText);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditText(todo.todo);
        setIsEditing(false);
    };

    return (
        <div className="flex items-center gap-4 p-5 bg-slate-700/30 border border-slate-600/30 rounded-2xl hover:bg-slate-700/40 hover:border-slate-600/50 transition-all backdrop-blur-sm group">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="w-6 h-6 text-slate-500 bg-slate-600 border-slate-500 rounded-lg focus:ring-2 focus:ring-slate-500 cursor-pointer transition-all"
            />

            {isEditing ? (
                <div className="flex-1 flex gap-3">
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleEdit();
                            if (e.key === "Escape") handleCancel();
                        }}
                        className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 text-slate-100 rounded-xl focus:ring-2 focus:ring-slate-500 focus:outline-none"
                        autoFocus
                    />
                    <button
                        onClick={handleEdit}
                        className="px-5 py-3 bg-slate-600 text-slate-100 rounded-xl hover:bg-slate-500 transition-all font-medium shadow-md"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        className="px-5 py-3 bg-slate-700 text-slate-300 rounded-xl hover:bg-slate-600 transition-all font-medium"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <>
                    <span
                        className={`flex-1 text-lg ${
                            todo.completed
                                ? "line-through text-slate-500"
                                : "text-slate-200"
                        }`}
                    >
                        {todo.todo}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-5 py-2 bg-slate-600 text-slate-100 rounded-xl hover:bg-slate-500 transition-all font-medium shadow-md"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(todo.id)}
                            className="px-5 py-2 bg-slate-700 text-slate-300 rounded-xl hover:bg-slate-600 transition-all font-medium shadow-md"
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TodoItem;
