const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3001'
  }));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://TaskDB:dfdfdf27@cluster0.mongodb.net/?ssl=true&replicaSet=atlas-iee5wp-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import Task model
const Task = require('./models/Task');

// Routes
// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API');
});

// Get all tasks (with optional filtering, pagination, and sorting)
app.get('/api/tasks', async (req, res) => {
  const { title, status, page = 1, limit = 10, sortBy = 'createdAt', order = 'asc' } = req.query;

  const filter = {};
  if (title) filter.title = new RegExp(title, 'i'); // Case-insensitive title search
  if (status) filter.status = status; // Status filtering (e.g., "completed", "pending")

  const skip = (page - 1) * limit;

  try {
    const tasks = await Task.find(filter)
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(Number(limit));
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new task
app.post('/api/tasks', async (req, res) => {
  const { title, description, status } = req.body;

  if (!title) return res.status(400).json({ message: 'Title is required' });

  try {
    const task = new Task({ title, description, status });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a task
app.put('/api/tasks/:id', async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Serve static files from React frontend
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all handler for React routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
