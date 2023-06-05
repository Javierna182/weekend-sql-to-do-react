const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET -- Setup a GET route to get all the tasks from the database
router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM "tasks" ORDERED BY task;`;
    pool.query(sqlText)
    .then((result) => {
        console.log(`Got stuff back from the database`, result);
        res.send(result.rows)
    })
    .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500); 
    })    
})// GET ends

// POST -- Setup a POST route to add a new task to the database
router.post('/', (req,res) => {
    const task = req.body;
    console.log('adding this task:' ,task);
    const sqlText = `INSERT INTO "tasks" (task)
                    VALUES($1)`;
    pool.query(sqlText, [task.task])
    .then((result) => {
        console.log(`Added task to the database`, task);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500); 
    })                 
})//POST ends

// PUT -- Setup a POST route to edit a task to the database
router.put('/:id', (req, res) => {// used id to get the id in the table in postico
    let updatedTask = req.body;//to request a new addition to the body
    let taskId = req.params.id;//to get the parameter of each id
    let queryUpdate = `
    UPDATE "tasks" SET "task" = $1 WHERE id = $2;
    `;
    pool.query(queryUpdate, [updatedTask.task, taskId])
    .then(() => {
        res.sendStatus(204)
    })
    .catch((error) => {
        console.error(error);
        res.sendStatus(500);
    })
})


// DELETE -- -- Setup a DELETE route to delete a task to the database

module.exports = router;
