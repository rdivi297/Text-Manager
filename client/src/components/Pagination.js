import { useState, useEffect } from 'react';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);

    const fetchTasks = async (page) => {
        const response = await fetch(`/api/tasks?page=${page}`);
        const data = await response.json();
        setTasks(data);
    };

    useEffect(() => {
        fetchTasks(page);
    }, [page]);

    return (
        <div>
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} />
            ))}
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                Previous
            </button>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
}

export default TaskList;
