const TodoStats = ({ activeCount, totalCount }) => {
    return (
        <div className="bg-slate-700/30 px-6 py-3 rounded-xl border border-slate-600/30 backdrop-blur-sm">
            <p className="text-slate-300 font-medium">
                <span className="text-slate-100 font-bold">{activeCount}</span>{" "}
                active /{" "}
                <span className="text-slate-100 font-bold">{totalCount}</span>{" "}
                total
            </p>
        </div>
    );
};

export default TodoStats;
