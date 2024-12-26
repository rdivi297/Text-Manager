import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';

function App() {
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <AddTaskForm />
      <TaskList />
    </div>
  );
}

export default App;
