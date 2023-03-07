import React, { useState } from 'react';
import ItemList from './ItemList';
import Pagination from './Pagination';

function ItemListContainer({ items }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Change this to the desired number of items per page
    const totalPages = Math.ceil(items.length / itemsPerPage);

    function handleChangePage(newPage) {
        setCurrentPage(newPage);
    }

    return (
        <div>
            <ItemList items={items} currentPage={currentPage} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChangePage={handleChangePage}
            />
        </div>
    );
}

export default ItemListContainer;
