const { Router } = require('express');
const UserController = require('./controllers/user.controller');
const router = Router();

router.post('/user', UserController.createUser);
router
  .route('/users/:userId')
  .get(UserController.getUserById)
  .patch(UserController.updateUserById)
  .delete(UserController.deleteUserById);

router.get('/users', UserController.getUsers);

module.exports = router;
