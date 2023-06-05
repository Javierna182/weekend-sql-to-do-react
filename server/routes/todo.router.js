const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET -- Setup a GET route to get all the items from the database
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

})

// POST

// PUT

// DELETE

module.exports = router;
