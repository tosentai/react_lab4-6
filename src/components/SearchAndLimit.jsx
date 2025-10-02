const SearchAndLimit = ({
    searchTerm,
    setSearchTerm,
    limitPerPage,
    setLimit,
}) => (
    <div className="my-4 flex gap-4 items-center">
        <input
            type="text"
            className="w-full p-4 text-lg text-gray-400 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
            className="p-4 text-lg border-2 text-gray-400 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
            value={limitPerPage}
            onChange={(e) => setLimit(Number(e.target.value))}
        >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
        </select>
    </div>
);

export default SearchAndLimit;
