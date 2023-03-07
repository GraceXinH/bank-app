import React from 'react';

function Pagination({ currentPage, totalPages, onChangePage }) {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => onChangePage(pageNumber)}
                    disabled={pageNumber === currentPage}
                >
                    {pageNumber}
                </button>
            ))}
        </div>
    );
}

export default Pagination;