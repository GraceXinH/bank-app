import React from 'react';
import "./PaginationStyles.css";

const Pagination = ({ postsPerPage, totalPosts, paginate, accountId, currentPage, accountNumber }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);

  }

  return (

    <div className='pagination'>
      {pageNumbers.map(number => (
        <a href={`/transaction/${accountId}/${accountNumber}/${number - 1}`} className={currentPage === number ? "page-link active" : "page-link"}>
          {number}
        </a>
      ))}
    </div>

  );
};

export default Pagination;
