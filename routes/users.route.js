const { Router } = require('express');
const usersController = require('../controllers/user.controller');
const { validateUser } = require('../middlewares');
const usersRouter = Router();

usersRouter.post('/user', validateUser.validateOnCreate, usersController.createUser);
usersRouter
  .route('/users/:userId')
  .get(usersController.getUserById)
  .patch(validateUser.validateOnUpdate, usersController.updateUserById)
  .delete(usersController.deleteUserById);

usersRouter.get('/users', usersController.getUsers);

module.exports = usersRouter;
