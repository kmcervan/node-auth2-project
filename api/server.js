const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// routers will go here

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// connecting routers will go here

server.get('/', (req, res) => {
    res.json({ api: 'is aliveeee!'});
});

module.exports = server;