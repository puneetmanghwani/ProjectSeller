const path = require('path');

const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

const withAuth = require('../middleware');


router.post('/register', userController.register);
router.post('/login', userController.login);


module.exports = router;