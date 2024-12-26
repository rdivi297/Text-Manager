import React, { useState } from 'react';
import axios from '../services/api';

function EditTaskForm({ task, onTaskUpdated }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/tasks/${task._id}`, { title, description, status })
      .then(() => {
        alert('Task updated successfully!');
        onTaskUpdated();
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
        />
        Completed
      </label>
      <button type="submit">Update Task</button>
    </form>
  );
}

export default EditTaskForm;
