const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const db = require('../models/connection');

const app = express();
const port = 6001;

app.use(bodyParser.json());

// Get all projects
app.get('/projects', (req, res) => {
    db.query('SELECT * FROM project', (err, results) => {
      if (err) {
        console.error('Error getting projects:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    });
  })

// Get a single project by ID
app.get('/projects/:projectId', (req, res) => {
  const projectId = req.params.projectId;
  db.query('SELECT * FROM project WHERE projectID = ?', [projectId], (err, results) => {
    if (err) {
      console.error('Error getting project:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(results[0]);
  });
});

// Add a new project
// Add a new project
app.post('/projects', (req, res) => {
    const { title, description, diffLevel, groupSize, userID, skillID } = req.body;
    const newProject = { title, description, diffLevel, groupSize, userID, skillID };
    const query = 'INSERT INTO project SET ?';
    db.query(query, newProject, (err, result) => {
      if (err) {
        console.error('Error adding project:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      newProject.projectID = result.insertId;
      res.status(201).json(newProject);
    });
  });
  

// Update an existing project
app.put('/projects/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    const { title, description, diffLevel, groupSize, userID, skillID } = req.body;
    const updatedProject = { title, description, diffLevel, groupSize, userID, skillID };
    db.query('UPDATE project SET ? WHERE projectID = ?', [updatedProject, projectId], err => {
      if (err) {
        console.error('Error updating project:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(updatedProject);
    });
  });

// Delete a project
app.delete('/projects/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    db.query('DELETE FROM project WHERE projectID = ?', [projectId], err => {
      if (err) {
        console.error('Error deleting project:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.sendStatus(204);
    });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
