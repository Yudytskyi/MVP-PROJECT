const { User } = require('./../models');
const _ = require('lodash');

exports.createUser = async ({ body }, res, next) => {
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
exports.getUserById = async ({ params: { userId } }, res, next) => {
  try {
    const user = await User.findByPk(userId);
    const userData = user.get();
    const prepearUser = _.omit(userData, ['password', 'updatedAt', 'createdAt']);

    user
      ? res.status(200).send({
          data: prepearUser,
        })
      : res.status(404).send({ message: `User with email ${userId} not found` });
  } catch (e) {
    next(e);
  }
};
exports.getUsers = async (req, res, next) => {
  try {
    const getUsers = await User.findAll({ attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } });
    const users = [];
    getUsers.forEach(({ dataValues: d }) => users.push(d));

    res.status(201).send({
      data: users,
    });
  } catch (e) {
    return next(e);
  }
};
exports.updateUserById = async (req, res, next) => {
  const {
    body,
    params: { userId },
  } = req;
  try {
    await User.update(body, { where: { id: `${userId}` } });

    res.status(201).send({ data: `User with id ${userId} updated` });
  } catch (e) {
    return next(e);
  }
};
exports.deleteUserById = async ({ params: { userId } }, res, next) => {
  try {
    (await User.destroy({ where: { id: userId } }))
      ? res.status(204).send({ data: `User with id ${userId} deleted` })
      : res.status(404).send({ data: `User with id ${userId} not found` });
  } catch (e) {
    return next(e);
  }
};
