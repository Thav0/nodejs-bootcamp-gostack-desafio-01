const express = require('express');
const server = express();
const checkProjectBody = require('./middleware/CheckProjectBody');
const checkProjectIDBody = require('./middleware/CheckProjectIDBody');
const checkProjectTitle = require('./middleware/CheckProjectTitle');
const checkTask = require('./middleware/CheckTask');

const projects = [];

server.use(express.json());

// Global middleware
server.use((req,res,next) => {
  return next();
})

server.get('/projects', (req, res) => {
  return res.send(projects);
});

server.get('/projects/:id', (req, res) => {
  const getProject = project.filter((el, index, array) => {
    const { id } = req.params;
    return el.id === id
  });

  return res.json(getProject);
});

server.post('/projects', checkProjectBody, (req, res) => {
  const checkID = projects.filter((val, index) => {
    return val.id === req.body.id
  })

  if( checkID.length ) {
    return res.status(400).json({ error: 'Project ID already used!' })
  }

  req.body.tasks = []
  projects.push(req.body);

  return res.send(projects);
});

server.put('/projects/:id', checkProjectTitle,(req, res) => {
  const {id} = req.params;

  objIndex = projects.findIndex((obj => obj.id === id));

  if( objIndex === -1 ) {
    return res.status(400).json({ error: 'Project not found!' })
  }

  projects[objIndex].title = req.body.title;

  return res.status(200).send(projects);
});

server.delete('/projects/:id', checkProjectIDBody, (req, res) => {
  const {id} = req.params;

  objIndex = projects.findIndex((obj => obj.id == id));

  if( objIndex === -1 ) {
    return res.status(400).json({ error: 'Project not found!' })
  }

  projects.splice(objIndex, 1);

  return res.send(projects);
});

server.post('/projects/:id/tasks',checkTask, (req, res) => {
  const {id} = req.params;
  const {task} = req.body;

  objIndex = projects.findIndex((obj => obj.id == id));

  if( objIndex === -1 ) {
    return res.status(400).json({ error: 'Project not found!' })
  }

  projects[objIndex].tasks.push(task);

  return res.status(201).send(projects);
});

server.listen(3000);