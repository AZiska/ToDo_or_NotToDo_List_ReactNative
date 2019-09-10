const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.use(express.json());
app.use(cors());

let todoItems = [
    {
        index: 0,
        task: "Koffie drinken",
        done: false,
        type: "todo",
    },
    {
        index: 1,
        task: "Planten water geven",
        done: false,
        type: "todo",
    },
    {
        index: 2,
        task: "Brood bakken",
        done: false,
        type: "todo",
    }
];

let notTodoItems = [
    {
        index: 0,
        task: "Opruimen",
        done: false,
        type: "nottodo",
    },
    {
        index: 1,
        task: "Planten dood laten gaan",
        done: false,
        type: "nottodo",
    },
    {
        index: 2,
        task: "Elke dag patat eten",
        done: false,
        type: "nottodo",
    }
];

// GET TODO
app.get('/todo', function (req, res) {
    console.log('GET the todo list is now: ', todoItems);
    res.send(JSON.stringify({
        todos: todoItems
    }))
});

// GET NOTTODO
app.get('/nottodo', function (req, res) {
    console.log('GET the nottodo list is now: ', notTodoItems);
    res.send(JSON.stringify({
        todos: notTodoItems
    }))
});

// POST TODO
app.post('/todo', function (req, res) {
    todoItems.push(req.body.newTodo);

    console.log('POST the todo list is now: ', todoItems);
    res.send(JSON.stringify({
        todos: todoItems
    }))
})

// POST NOTTODO
app.post('/nottodo', function (req, res) {
    notTodoItems.push(req.body.newTodo);

    console.log('POST the nottodo list is now: ', notTodoItems);
    res.send(JSON.stringify({
        todos: notTodoItems
    }))
})

// PUT TODO
app.put('/todo', function (req, res) {
    const task = req.body;
    const taskIndex = task.index;
    // updating done status of element
    todoItems[taskIndex] = {
        index: taskIndex,
        task: task.task,
        done: !task.done,
        type: task.type
    }

    console.log("PUT the todo list is now: ", todoItems)

    res.send(JSON.stringify({
        todos: todoItems
    }))
})

// PUT NOTTODO
app.put('/nottodo', function (req, res) {
    const task = req.body;
    const taskIndex = task.index;
    // updating done status of element
    notTodoItems[taskIndex] = {
        index: taskIndex,
        task: task.task,
        done: !task.done,
        type: task.type
    }

    console.log("PUT the nottodo list is now: ", notTodoItems)

    res.send(JSON.stringify({
        todos: notTodoItems
    }))
})

// DELETE TODO
app.delete('/todo', function (req, res) {
    const task = req.body;
    const taskIndex = task.index;
    todoItems.splice(taskIndex, 1)

    //update index of list items
    for (let i = 0; i < todoItems.length; i++) {
        todoItems[i].index = i
    }

    console.log("DELETE the todo list is now: ", todoItems)

    res.send(JSON.stringify({
        todos: todoItems
    }))
})

// DELETE NOTTODO
app.delete('/nottodo', function (req, res) {
    const task = req.body;
    const taskIndex = task.index;
    notTodoItems.splice(taskIndex, 1)

    //update index of list items
    for (let i = 0; i < notTodoItems.length; i++) {
        notTodoItems[i].index = i
    }

    console.log("DELETE the nottodo list is now: ", notTodoItems)

    res.send(JSON.stringify({
        todos: notTodoItems
    }))
})
