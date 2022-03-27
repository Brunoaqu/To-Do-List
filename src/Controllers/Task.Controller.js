const createError = require('http-errors');
const mongoose = require('mongoose');

const Task = require('../Models/Task.Model');

module.exports = {
  getAllTasks: async (req, res, next) => {
    try {
      const results = await Task.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewTask: async (req, res, next) => {
    try {
      const task = new Task(req.body);
      const result = await task.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  updateATask: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Task.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Task does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Task Id'));
      }

      next(error);
    }
  },

  deleteATask: async (req, res, next) => {
    const param = req.params.id;

    try {
      const result = await Task.findByIdAndDelete(param);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Task does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Task param'));
        return;
      }
      next(error);
    }
  },
  
  deleteAlltask: async (req, res, next) => {
    const state = req.params.state;
    try {
      const result = await Task.deleteMany({"state": state});
      if (!result) {
        throw createError(404, `There are no ${state} task`);
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Task state'));
        return;
      }
      next(error);
    }
  }
};