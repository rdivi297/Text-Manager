import { useState } from 'react';

function TaskSearch({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm, status);
    };

    return (
        <div className="task-search">
            <input
                type="text"
                placeholder="Search by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
            </select>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default TaskSearch;
