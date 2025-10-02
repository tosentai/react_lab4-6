const SearchAndLimit = ({
    searchTerm,
    setSearchTerm,
    limitPerPage,
    setLimit,
}) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Search todos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600/50 text-slate-100 placeholder-slate-400 rounded-2xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 focus:outline-none transition-all backdrop-blur-sm"
                />
            </div>

            <div className="flex items-center gap-3 bg-slate-700/30 px-6 py-3 rounded-2xl border border-slate-600/30 backdrop-blur-sm">
                <label
                    htmlFor="limit"
                    className="text-slate-300 font-medium whitespace-nowrap"
                >
                    Per page:
                </label>
                <select
                    id="limit"
                    value={limitPerPage}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="px-4 py-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-xl focus:ring-2 focus:ring-slate-500 focus:outline-none cursor-pointer"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </div>
    );
};

export default SearchAndLimit;
