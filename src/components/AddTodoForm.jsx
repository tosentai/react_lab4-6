import { useState } from "react";

const AddTodoForm = ({ onAdd }) => {
    const [newTodo, setNewTodo] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            onAdd(newTodo);
            setNewTodo("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-3">
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add new todo..."
                className="flex-1 px-6 py-4 bg-slate-700/50 border border-slate-600/50 text-slate-100 placeholder-slate-400 rounded-2xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 focus:outline-none transition-all backdrop-blur-sm"
            />
            <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-slate-600 to-slate-700 text-slate-100 cursor-pointer rounded-2xl hover:from-slate-500 hover:to-slate-600 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
                Add
            </button>
        </form>
    );
};

export default AddTodoForm;
