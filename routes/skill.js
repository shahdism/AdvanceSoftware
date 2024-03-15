const express = require('express');
const router = express.Router();
const db = require('../models/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Define the port number
const port = 6001;

// Middleware function for logging incoming requests
router.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.originalUrl}`);
  next();
});

// Route to add a new skill
router.post('/skills', (req, res, next) => {
  console.log('Step 1: Received request to add a new skill:', req.body);
  const { skillName } = req.body;
  if (!skillName) {
    console.log('Step 2: Skill name is required');
    return res.status(400).json({ error: 'Skill name is required' });
  }

  db.query('INSERT INTO skill (skillName) VALUES (?)', [skillName], (err, result) => {
    if (err) {
      console.error('Step 3: Error adding skill: ', err);
      return next(err);
    }
    console.log('Step 4: Skill added successfully');
    res.status(201).json({ message: 'Skill added successfully', skillId: result.insertId });
  });
});

// Route to get all skills
router.get('/skills', (req, res, next) => {
  console.log('Step 5: Received request to get all skills');
  db.query('SELECT * FROM skill', (err, results) => {
    if (err) {
      console.error('Step 6: Error getting skills: ', err);
      return next(err);
    }
    console.log('Step 7: Retrieved skills successfully');
    res.status(200).json(results);
  });
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error('Step 8: Internal server error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Create the Express app and start listening on the defined port
const app = express();
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
