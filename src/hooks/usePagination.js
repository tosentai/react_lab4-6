import { useState, useMemo } from "react";

export const usePagination = (items, initialLimit = 10) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(initialLimit);

    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * limitPerPage;
        const endIndex = startIndex + limitPerPage;
        return items.slice(startIndex, endIndex);
    }, [items, currentPage, limitPerPage]);

    const totalPages = Math.ceil(items.length / limitPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((p) => p + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((p) => p - 1);
        }
    };

    const goToPage = (page) => {
        const pageNumber = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(pageNumber);
    };

    const setLimit = (limit) => {
        setLimitPerPage(limit);
        setCurrentPage(1);
    };

    const resetPage = () => setCurrentPage(1);

    return {
        paginatedItems,
        currentPage,
        limitPerPage,
        totalPages,
        goToNextPage,
        goToPrevPage,
        goToPage,
        setLimit,
        resetPage,
    };
};
