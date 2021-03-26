const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// connecting routers go here
 
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

//page connectors here
// server.use()

server.get('/', (req, res) => {
    res.json('api is Aliveeee')
})

module.exports = server;