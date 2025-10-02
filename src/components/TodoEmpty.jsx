const TodoEmpty = () => {
    return (
        <div className="text-center py-20 bg-slate-700/20 rounded-2xl border border-slate-600/30 backdrop-blur-sm">
            <p className="text-2xl text-slate-400 font-medium">
                No todos found
            </p>
            <p className="text-slate-500 mt-2">Add a new task to get started</p>
        </div>
    );
};

export default TodoEmpty;
