const dotenv = require('dotenv');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo')

const app = express();
app.use(cors({
    origin:'https://mern-todo-app-qx37.vercel.app/',
}));
app.use(express.json());

dotenv.config();
// mongoose.connect('mongodb://127.0.0.1:27017/test');
mongoose.connect(process.env.MONGODB_URI);

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => console.log(err)
    )
})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
    
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
});

app.listen(3001, () => {
    console.log("Server is Running...");
});