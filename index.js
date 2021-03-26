require('dotenv').config();

const server = require('./api/server');

const port = process.env.PORT || 4102;
server.listen(port, ()=> console.log(`\n** Running on port ${port} **\n`));