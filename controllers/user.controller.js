const { User } = require('./../models');
const _ = require('lodash');

exports.createUser = async (req, res, next) => {
  const { body } = req;

  try {
    const createdUser = await User.create(body);
    const userData = createdUser.get();
    const user = _.omit(userData, ['password', 'updatedAt', 'createdAt']);

    res.status(201).send({
      data: user,
    });
  } catch (e) {
    return next(e);
  }
};
exports.getUserById = async (req, res, next) => {};
exports.getUsers = async (req, res, next) => {};
exports.updateUserById = async (req, res, next) => {};
exports.deleteUserById = async (req, res, next) => {};
