// API for managing task and action data
const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const config = require('./knexfile.js');
const db = knex(config.development);
const errors = {
  '19': 'Another record with that value exists'
}

const server = express();

server.use(helmet());
server.use(express.json());

server.get('', (req, res) => {
  res.status(200).json({ message: "Server says hi." });
});

// POST new project
server.post('/api/projects', async (req, res) => {
  const projData = req.body;
  if(projData.name 
    && projData.description 
    && projData.completed) {
    try {
      const [newProjId] = await db('projects')
        .insert(projData);
      res.status(201).json({ newProjId: newProjId });
    } catch (error) {
      const msg = errors[error.errno] || error;
      res.status(500).json({ msg });
    }
  } else {
    res.status(400).json({ message: "Please provide complete project data." });
  }
});

// POST new action
server.post('/api/actions', async (req, res) => {
  const actionData = req.body;
  if(actionData.project_id
    && actionData.description
    && actionData.notes
    && actionData.completed){
      try {
        const [newActionId] = await db('actions')
          .insert(actionData);
        res.status(201).json({ newActionId: newActionId });
      } catch (error) {
        const msg = errors[error.errno] || error;
        res.status(500).json({ msg });
      }
      
    } else {
      res.status(400).json({ message: "Please provide complete action data." });
    }
});

// GET project by id

const port = process.env.PORT || 4040;

server.listen(port, () => console.log(`\n Server listening on ${port}\n`));