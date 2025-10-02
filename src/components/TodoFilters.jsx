const FilterButton = ({ label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
                isActive
                    ? "bg-slate-600 text-slate-100 shadow-lg"
                    : "bg-slate-700/30 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300"
            }`}
        >
            {label}
        </button>
    );
};

const TodoFilters = ({ activeFilter, setFilter }) => {
    return (
        <div className="flex gap-2 bg-slate-700/20 p-2 rounded-2xl border border-slate-600/30 backdrop-blur-sm">
            <FilterButton
                label="All"
                isActive={activeFilter === "all"}
                onClick={() => setFilter("all")}
            />
            <FilterButton
                label="Active"
                isActive={activeFilter === "active"}
                onClick={() => setFilter("active")}
            />
            <FilterButton
                label="Done"
                isActive={activeFilter === "done"}
                onClick={() => setFilter("done")}
            />
        </div>
    );
};

export default TodoFilters;
