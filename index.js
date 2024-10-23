const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());



let tasks = [
    { id: 1, text: "Sample Task", completed: false }
];

// Add new task
app.post('/task', (req, res) => {
    const task = { id: tasks.length + 1, text: req.body.text, completed: false };
    tasks.push(task);
    res.status(201).json(task);
});

// Complete a task
app.put('/task/:id/complete', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found.');
    task.completed = true;
    res.json(task);
});

// Delete a task
app.delete('/task/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).send('Task not found.');
    const removedTask = tasks.splice(taskIndex, 1);
    res.json(removedTask);
});

// Get all tasks
app.get('/tasks', (req, res) => {
    console.log('GET /tasks called'); // <-- Add this line
    const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed || a.id - b.id);
    res.json(sortedTasks);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
