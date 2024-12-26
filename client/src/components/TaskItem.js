import React from 'react';
import axios from '../services/api';

function TaskItem({ task }) {
  const handleDelete = () => {
    axios.delete(`/tasks/${task._id}`).then(() => {
      alert('Task deleted successfully!');
    });
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status ? 'Completed' : 'Pending'}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TaskItem;
