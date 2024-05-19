const express = require('express');
const userController = require('../Controllers/userController');
const router = express.Router();

router.post('/sign-up', userController.createUser);
router.post('/login', userController.login);

module.exports = router;
