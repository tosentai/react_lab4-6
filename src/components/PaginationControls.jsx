import { useState } from "react";

const PaginationControls = ({
    currentPage,
    totalPages,
    onNext,
    onPrev,
    onGoToPage,
}) => {
    const [pageInput, setPageInput] = useState("");

    if (totalPages <= 1) return null;

    const handlePageSubmit = (e) => {
        e.preventDefault();
        const pageNumber = parseInt(pageInput);

        if (pageNumber && pageNumber >= 1 && pageNumber <= totalPages) {
            onGoToPage(pageNumber);
            setPageInput("");
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value === "" || /^\d+$/.test(value)) {
            setPageInput(value);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-700/50">
            <button
                onClick={onPrev}
                disabled={currentPage === 1}
                className="w-full sm:w-auto px-8 py-4 bg-slate-700 text-slate-100 cursor-pointer rounded-2xl disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed hover:bg-slate-600 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
            >
                Previous
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-4">
                <span className="text-slate-300 font-semibold text-lg bg-slate-700/30 px-6 py-3 rounded-xl border border-slate-600/30">
                    Page {currentPage} of {totalPages}
                </span>

                <form
                    onSubmit={handlePageSubmit}
                    className="flex items-center gap-2"
                >
                    <span className="text-slate-400 text-sm">Go to:</span>
                    <input
                        type="text"
                        value={pageInput}
                        onChange={handleInputChange}
                        placeholder="Page"
                        className="w-20 px-4 py-3 bg-slate-700/50 border border-slate-600/50 text-slate-100 placeholder-slate-500 text-center rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 focus:outline-none transition-all"
                    />
                    <button
                        type="submit"
                        className="px-5 py-3 bg-slate-600 text-slate-100 cursor-pointer rounded-xl hover:bg-slate-500 transition-all font-medium shadow-md hover:shadow-lg"
                    >
                        Go
                    </button>
                </form>
            </div>

            <button
                onClick={onNext}
                disabled={currentPage === totalPages}
                className="w-full cursor-pointer sm:w-auto px-8 py-4 bg-slate-700 text-slate-100 rounded-2xl disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed hover:bg-slate-600 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
            >
                Next
            </button>
        </div>
    );
};

export default PaginationControls;
