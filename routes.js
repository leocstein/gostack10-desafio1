const express = require('express');

const routes = express.Router();

const projects = [];

function checkProjectExists(req, res, next) {
  const { id } = req.params;

  const project = projects.find(project => project.id == id);
  if (!project) {
    return res.status(400).json({ error: 'Project does not exists' });
  }

  req.project = project;

  return next();
}

function checkProjectAlreadyCreate(req, res, next) {
  const { id } = req.body;

  const project = projects.find(project => project.id === id);

  if (!project) {
    return next();
  }

  return res.status(400).json({ error: 'Project ID already used!' });
}

routes.get('/projects', (req, res) => {
  return res.json(projects);
});

routes.get('/projects/:id', checkProjectExists, (req, res) => {
  return res.json(req.project);
});

routes.post('/projects', checkProjectAlreadyCreate, (req, res) => {
  const { id, title, tasks = [] } = req.body;

  projects.push({ id, title, tasks });

  return res.json(projects);
});

routes.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = req.project;
  project.title = title;

  return res.json(project);
});

routes.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id == id);

  projects.splice(projectIndex, 1);

  return res.json();
});

routes.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { title } = req.body;

  const project = req.project;

  project.tasks.push({ title });

  return res.json(projects);
});

module.exports = routes;