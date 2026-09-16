const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'taskuser',
    password: 'taskpass123',
    database: 'taskmanager'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected');
});

app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/tasks', (req, res) => {
    const { title, status } = req.body;

    db.query(
        'INSERT INTO tasks(title,status) VALUES (?,?)',
        [title, status],
        (err, result) => {
            if (err) throw err;
            res.send('Task Added');
        }
    );
});

app.put('/tasks/:id', (req, res) => {
    const { title, status } = req.body;

    db.query(
        'UPDATE tasks SET title=?, status=? WHERE id=?',
        [title, status, req.params.id],
        (err, result) => {
            if (err) throw err;
            res.send('Task Updated');
        }
    );
});

app.delete('/tasks/:id', (req, res) => {
    db.query(
        'DELETE FROM tasks WHERE id=?',
        [req.params.id],
        (err, result) => {
            if (err) throw err;
            res.send('Task Deleted');
        }
    );
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
