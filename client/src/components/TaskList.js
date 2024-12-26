import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import axios from '../services/api';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/tasks').then((response) => {
      setTasks(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
