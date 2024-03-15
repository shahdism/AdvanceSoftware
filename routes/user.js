const express = require('express');
const router = express.Router();
const db = require('../models/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Define the port number
const port = 6001;
const app = express();
app.use(express.json());
app.use(router);
// Middleware function for logging incoming requests
router.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.originalUrl}`);
  next();
});

// Route to add a new user
router.post('/users', (req, res, next) => {
  console.log('Received request to add a new user:', req.body);
  const {userID, username, email, password, craftskills, interest } = req.body;
  if (!userID,!username || !email || !password || !craftskills || !interest) {
    return res.status(400).json({ error: 'Username, email, password, craftskills, and interest are required' });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password: ', err);
      return next(err); // Pass the error to the error handling middleware
    }
    const newUser = { username, email, password: hash, craftskills, interest };
    db.query('INSERT INTO users SET ?', newUser, (err, result) => {
      if (err) {
        console.error('Error adding user: ', err);
        return next(err); // Pass the error to the error handling middleware
      }
      const token = jwt.sign({ username: newUser.username, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ message: 'User added successfully', userId: result.insertId, token });
    });
  });
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
}



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
