const express = require('express')
const server = express()

const db = require('./data/helpers/projectModel.js')
const { get } = db

//Middleware
server.use(express.json())

server.get('/', (req, res) => {
    res.send(`
      <h2>WEB API Sprint Challenge</h2>
      <p>You can do it</p>
      `);
  });

server.get('/projects', async (req, res) =>{
    try{
        const projectList = await get();
        res.status(200).json(projectList)
    } catch (error) {
        res.status(500).json({
            message: "The project list could not be retrieved."
        })
    }
})




  module.exports = server;