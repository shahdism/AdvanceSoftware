const express = require('express');
const router = express.Router();
const db = require('./connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Define the port number
const port = 6001;
console.log("ggg");
// Middleware function for logging incoming requests
router.use((req, res, next) => {
  console.log("ggg");

  console.log(`Incoming ${req.method} request to ${req.originalUrl}`);
  next();
});

// Route to add a new skill
router.post('/skills', (req, res, next) => {
  console.log("ggg");

  console.log('Step 1: Received request to add a new skill:', req.body); // Log step 1
  const { skillName } = req.body;
  if (!skillName) {
    console.log('Step 2: Skill name is required'); // Log step 2
    return res.status(400).json({ error: 'Skill name is required' });
  }

  db.query('INSERT INTO skill (skillName) VALUES (?)', [skillName], (err, result) => {
    if (err) {
      console.error('Step 3: Error adding skill: ', err); // Log step 3
      return next(err); // Pass the error to the error handling middleware
    }
    console.log('Step 4: Skill added successfully'); // Log step 4
    res.status(201).json({ message: 'Skill added successfully', skillId: result.insertId });
  });
});

// Route to get all skills
router.get('/skills', (req, res, next) => {
  console.log("ggg");

  console.log('Step 5: Received request to get all skills'); // Log step 5
  db.query('SELECT * FROM skill', (err, results) => {
    if (err) {
      console.error('Step 6: Error getting skills: ', err); // Log step 6
      return next(err); // Pass the error to the error handling middleware
    }
    console.log('Step 7: Retrieved skills successfully'); // Log step 7
    res.status(200).json(results);
  });
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error('Step 8: Internal server error:', err.stack); // Log step 8
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = {
  router,
  port
};
