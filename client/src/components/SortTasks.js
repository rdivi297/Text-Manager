function SortTasks({ onSort }) {
    const handleSort = (sortBy) => {
        onSort(sortBy);
    };

    return (
        <div>
            <button onClick={() => handleSort('title')}>Sort by Title</button>
            <button onClick={() => handleSort('createdAt')}>Sort by Date</button>
            <button onClick={() => handleSort('status')}>Sort by Status</button>
        </div>
    );
}
