const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(cors()); //allows frontend to have access to this envirnment
app.use(express.json());

const projects = [];

//this function is a Middleware
//It works as a requisition interceptor, before the response getting back to user
//this function below allows me to see all the requests a user does
function logRequest(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);
  
  next(); //next = next middleware in the linear path = a route

  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  //this will totally stop the process if the ID is not identified
  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid project ID'});
  }

  return next();
}

app.use(logRequest);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
  const { title } = request.query;

  //filtering a result
  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

  return response.json(results);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;
  
  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;
  
  const projectIndex = projects.findIndex(project => project.id === id);
  
  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not Found' })
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);
  
  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not Found' })
  }

  projects.splice(projectIndex, 1);
  //204 status because it will return an empty thing
  return response.status(204).send();
});

//in which door I want this to go?
app.listen(3333, () => {
  console.log('🦉');
});