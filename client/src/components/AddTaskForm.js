import React, { useState } from 'react';
import axios from '../services/api';

function AddTaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/tasks', { title, description })
      .then((response) => {
        alert('Task added successfully!');
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTaskForm;
