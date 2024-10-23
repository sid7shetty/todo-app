import React, { useState, useEffect } from 'react';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await fetch('http://localhost:3000/tasks');
        const data = await response.json();
        console.log(data);
        setTasks(data);
    };

    const addTask = async () => {
        await fetch('http://localhost:3000/task', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ text: newTask })
        });
        setNewTask('');
        fetchTasks();
    };

    const completeTask = async (id) => {
        await fetch(`http://localhost:3000/task/${id}/complete`, { method: 'PUT' });
        fetchTasks();
    };
    

    const deleteTask = async (id) => {
        await fetch(`http://localhost:3000/task/${id}`, { method: 'DELETE' });
        fetchTasks();
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="New Task" />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.completed ? <s>{task.text}</s> : task.text}
                        <button onClick={() => completeTask(task.id)}>Complete</button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
