const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

let tasks = []; 

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        alert("both the fields are required");
        return res.status(400).json({ message: 'Title and description are required!' });
    }
    const newTask = { id: tasks.length + 1, title, description };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
