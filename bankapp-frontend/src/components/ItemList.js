import React from 'react';

function ItemList({ items, currentPage }) {
    const itemsPerPage = 10; // Change this to the desired number of items per page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayedItems = items.slice(startIndex, endIndex);

    return (
        <div>
            {displayedItems.map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}
        </div>
    );
}

export default ItemList;
