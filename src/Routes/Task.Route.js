const express = require('express');
const router = express.Router();

const TaskController = require('../Controllers/Task.Controller');

//Get a list of all products
router.get('/', TaskController.getAllTasks);

//Create a new product
router.post('/', TaskController.createNewTask);

//Update a product by id
router.patch('/:id', TaskController.updateATask);

//Delete a product by id
router.delete('/:id', TaskController.deleteATask);

//Delete all products by it state
router.delete('/state/:state', TaskController.deleteAlltask);

module.exports = router;