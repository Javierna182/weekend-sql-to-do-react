const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET -- Setup a GET route to get all the items from the database
router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM ""`
})

// POST

// PUT

// DELETE

module.exports = router;
