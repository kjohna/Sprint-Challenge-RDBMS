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
server.get('/api/projects/:id', async (req, res) => {
  const projId = req.params.id;
  try {
    const projData = await db('projects')
      .where({ id: projId})
      .first();
    const actionData = await db('actions')
      .select('id', 'description', 'notes', 'completed')
      .where({ project_id: projId });
    const returnData = {
      ...projData,
      actions: actionData
    }
    res.status(200).json(returnData);
    // // harder way to format correctly but one hit to db!:
    // const projData = await db('projects')
    // .select(db.raw(`
    //   p.id as projId, 
    //   p.name as projName, 
    //   p.description as projDescr, 
    //   p.completed as projComplete, 
    //   a.id as actId,
    //   a.description as actDescr,
    //   a.notes as actNotes,
    //   a.completed as actCompleted
    // `))
    // .from('projects as p')
    // .innerJoin('actions as a', 'p.id', '=', 'a.project_id')
    // .where({ projId: projId });
    // console.log(projData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET all projects
server.get('/api/projects', async (req, res) => {
  try {
    const projects = await db('projects');
    if (projects) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ message: "No projects found, create one!" })
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET all actions
server.get('/api/actions', async (req, res) => {
  try {
    const actions = await db('actions');
    if (actions) {
      res.status(200).json(actions);
    } else {
      res.status(404).json({ message: "No actions found, create one!" })
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT update project by id
server.put('/api/projects/:id', async (req, res) => {
  const projId = req.params.id;
  try {
    const count = await db('projects')
      .where({ id: projId })
      .update(req.body);
    if (count > 0) {
      const updatedProj = await db('projects')
        .where({ id: projId })
        .first();
      res.status(200).json(updatedProj);
    } else {
      res.status(404).json({ message: `No project with id: ${projId}.`});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT update action by id
server.put('/api/actions/:id', async (req, res) => {
  const actionId = req.params.id;
  try {
    const count = await db('actions')
      .where({ id: actionId })
      .update(req.body);
    if (count > 0) {
      const updatedAction = await db('actions')
        .where({ id: actionId })
        .first();
      res.status(200).json(updatedAction);
    } else {
      res.status(404).json({ message: `No action with id: ${actionId}.`});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE project or action depending on req.params
server.delete('/api/:table/:id', async (req, res) => {
  const table = req.params.table;
  const id = req.params.id;
  try {
    const numDeleted = await db(table)
      .where({ id: id })
      .del();
    if (numDeleted > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: `No ${table} item with that id!` });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

const port = process.env.PORT || 4040;

server.listen(port, () => console.log(`\n Server listening on ${port}\n`));