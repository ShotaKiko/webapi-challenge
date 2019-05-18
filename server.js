const express = require('express')
const server = express()


//Middleware
server.use(express.json())

server.get('/', (req, res) => {
    res.send(`
      <h2>WEB API Sprint Challenge</h2>
      <p>You can do it</p>
      `);
  });

  module.exports = server;