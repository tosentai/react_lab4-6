const PaginationControls = ({
    currentPage,
    totalTodos,
    limitPerPage,
    goToNextPage,
    goToPrevPage,
}) => {
    const totalPages = Math.ceil(totalTodos / limitPerPage);

    return (
        <div className="flex items-center gap-2">
            <button
                className="px-2 bg-gray-200 rounded disabled:opacity-50"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button
                className="px-2 bg-gray-200 rounded disabled:opacity-50"
                onClick={goToNextPage}
                disabled={currentPage >= totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default PaginationControls;
