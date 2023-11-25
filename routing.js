const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('hello.');
});

app.get('/about', (req, res) => {
    res.send('hello world, this is about page');
});

app.get('/todos', (req, res) => {
    fs.readFile('./todos.json', 'utf-8', (err, data) => {
        let todos = JSON.parse(data);
        res.send(todos);
    });
});

app.get('/todos/:id', (req, res) => {
    fs.readFile('./todos.json', 'utf-8', (err, data) => {
        let todos = JSON.parse(data);
        let index = todos.findIndex(todo => {
            return todo.id == req.params.id;
        });

        if (index !== -1) {
            let todo = todos[index];
            res.send(todo);
        } else {
            res.send('Todo not found');
        }
    });
});

app.listen(port, () => {
    console.log('app listening on port', port);
});