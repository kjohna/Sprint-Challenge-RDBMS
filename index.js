// API for managing task and action data
const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('', (req, res) => {
  res.status(200).json({ message: "Server says hi." });
});

const port = process.env.PORT || 4040;

server.listen(port, () => console.log(`\n Server listening on ${port}\n`));