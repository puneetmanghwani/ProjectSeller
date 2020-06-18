const path = require('path');

const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

const withAuth = require('../middleware');

const multer = require('multer');
const upload = multer();
router.post('/register',upload.fields(['image']), userController.register);
router.post('/login', userController.login);


module.exports = router;