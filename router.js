const { Router } = require('express');
const { usersRouter } = require('./routes');
const router = Router();

module.exports = router.use(usersRouter);
