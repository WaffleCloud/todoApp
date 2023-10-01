const PORT = process.env.PORT ?? 8000;
const express = require('express');
const app = express();
const pool = require('./db')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');


app.use(cors());
app.use(express.json())

//get all todos
app.get('/todos/:userEmail', async (req, res) => {
    console.log(req)
    const { userEmail } = req.params
    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
        res.json(todos.rows)
    } catch(err){
        console.error(err)
    }
})

//create a new todo

app.post('/todos', async (req, res) => {
    const { user_email, title, progress, date } = req.body 
    const id = uuidv4()
    try {
        const newTodo = await pool.query(`INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
        [id, user_email, title, progress, date])
        res.json(newTodo)
    } catch (err) {
        console.error(err)
    }
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))