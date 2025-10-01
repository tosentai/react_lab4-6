const FilterButton = ({ label, isActive, onClick }) => {
    const activeClasses = "text-indigo-600 font-bold";
    const inactiveClasses = "text-gray-500 hover:text-indigo-600";
    return (
        <button
            onClick={onClick}
            className={`px-2 ${isActive ? activeClasses : inactiveClasses}`}
        >
            {label}
        </button>
    );
};

const TodoFilters = ({ activeFilter, setFilter }) => {
    return (
        <div className="flex gap-2">
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
                label="Completed"
                isActive={activeFilter === "done"}
                onClick={() => setFilter("done")}
            />
        </div>
    );
};

export default TodoFilters;
