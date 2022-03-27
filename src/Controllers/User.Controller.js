const createError = require('http-errors');
const mongoose = require('mongoose');

const User = require('../Models/User.Model');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const results = await User.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const user = new User(req.body);
      const result = await user.save();
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

  updateAUser: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await user.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'User does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid User Id'));
      }

      next(error);
    }
  },

  deleteAUser: async (req, res, next) => {
    const param = req.params.id;

    try {
      const result = await User.findByIdAndDelete(param);
      // console.log(result);
      if (!result) {
        throw createError(404, 'User does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid User param'));
        return;
      }
      next(error);
    }
  },
};