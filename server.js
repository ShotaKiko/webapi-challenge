const express = require('express')
const server = express()
const logger = require('morgan');

const db = require('./data/helpers/projectModel.js')
const { get } = db
const { insert } = db
const { remove } = db
const { update } = db
const { getProjectActions } = db

//Middleware
server.use(express.json())
server.use(logger('dev'))

//Routing paths
server.get('/', (req, res) => {
    res.send(`
      <h2>WEB API Sprint Challenge</h2>
      <p>You can do it</p>
      `);
  });

server.get('/api/projects', async (req, res) =>{
    try{
        const projectList = await get();
        res.status(200).json(projectList)
    } catch (error) {
        res.status(500).json({
            message: "The project list could not be retrieved."
        })
    }
})
//??needed~~~~~~~~~~~~~~~~~~~
server.get('/api/projects/:id', async (req, res) =>{
    try{
        const id = req.params.id
        const projectListItem = await get(id);
        res.status(200).json(projectListItem)
    } catch (error) {
        res.status(500).json({
            message: "The project list could not be retrieved."
        })
    }
})
//~~~~~~~~~~~~~~~~
server.post('/api/projects', async (req, res) => {
    try{
        const newProject = req.body
        const addedPost = await insert(newProject);
        res.status(201).json(addedPost)
    } catch (error) {
        res.status(500).json({
            message: "There was an error while saving the post to the database."
        })
    }
})

server.delete('/api/projects/:id', async (req, res) => {
    try{
        const { id } =req.params
        await remove(id)
        res.status(202)
    } catch (error) {
        res.status(404).json({
            message:"The post with the specified id does not exist"
        })
    }
})

server.put('/api/projects/:id', async (req, res) => {
    try{
        const updatedProject = await update(req.params.id, req.body)
        if(updatedProject){
        res.status(200).json(updatedProject) 
    } else {
        res.status(404).json({
            message:"id not found"
        })
    }
    } catch (error) {
        res.status(500).json({
            message: "error updating"
        })
    }
})

server.get('/api/projects/:id/actions', async (req, res) =>{
    try{
        const projectActions = await getProjectActions(req.params.id);
        res.status(200).json(projectActions)
    } catch (error) {
        res.status(500).json({
            message: "The project actions could not be retrieved."
        })
    }
})




  module.exports = server;