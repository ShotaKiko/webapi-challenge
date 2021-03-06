const express = require('express')
const server = express()
const logger = require('morgan');

const db = require('./data/helpers/projectModel.js')
const dbAction = require('./data/helpers/actionModel.js')
// const { get } = db
// const { insert } = db
// const { remove } = db
// const { update } = db
// const { getProjectActions } = db
//ask why destructuring doesnt work with status code??

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

//~~~~~~~~~~~~~~~~~Project Endpoints~~~~~~~~~~~~~~~~~~~~~~~~
server.get('/api/projects', async (req, res) =>{
    try{
        const projectList = await db.get();
        res.status(200).json(projectList)
    } catch (error) {
        res.status(500).json({
            message: "The project list could not be retrieved."
        })
    }
})

server.get('/api/projects/:id', async (req, res) =>{
    try{
        const id = req.params.id
        const projectListItem = await db.get(id);
        res.status(200).json(projectListItem)
    } catch (error) {
        res.status(500).json({
            message: "The project list could not be retrieved."
        })
    }
})

server.post('/api/projects', async (req, res) => {
    try{
        const newProject = req.body
        const addedPost = await db.insert(newProject);
        res.status(201).json(addedPost)
    } catch (error) {
        res.status(500).json({
            message: "There was an error while saving the post to the database."
        })
    }
})

server.delete('/api/projects/:id', async (req, res) => {
    try{
        const deletedItem = await db.remove(req.params.id)
        if(deletedItem > 0){
        res.status(202).json({
            message:"Target destroyed"
        })
    } else {
        res.status(404).json({
            message:"The post with the specified id does not exist"
        })
    }
    } catch (error) {
        res.status(500).json({
            message:"Unable to delete"
        })
    }
})

server.put('/api/projects/:id', async (req, res) => {
    try{
        const updatedProject = await db.update(req.params.id, req.body)
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
//~~~~~~~~~~~Action Endpoints~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
server.get('/api/projects/:id/actions', async (req, res) =>{
    try{
        const projectActions = await db.getProjectActions(req.params.id);
        res.status(200).json(projectActions)
    } catch (error) {
        res.status(500).json({
            message: "The project actions could not be retrieved."
        })
    }
})

server.post('/api/projects/:id/actions', async (req, res) =>{
    const newAction = { ...req.body, project_id: req.params.id}
    try{
        const addedAction = await dbAction.insert(newAction);
        res.status(201).json(addedAction)
    } catch (error) {
        res.status(500).json({
            message: "The action could not be added."
        })
    }
})

server.delete('/api/projects/:project_id/actions/:id', async (req, res) => {
    try{
        const deletedAction = await dbAction.remove(req.params.id);
        if(deletedAction > 0){
        res.status(202).json({
            message:"Action deleted"
        })
    }else {
        res.status(404).json({
            message:"no action with this id found"
        })
    }
    } catch (error) {
        res.status(500).json({
            message: "The action could not be deleted."
        })
    }
})

server.put('/api/projects/:project_id/actions/:id', async (req, res) => {
    try{
        const updatedAction = await dbAction.update(req.params.id, req.body);
        res.status(200).json(updatedAction)
    } catch (error) {
        res.status(500).json({
            message: "The action could not be updated."
        })
    }
})





  module.exports = server;