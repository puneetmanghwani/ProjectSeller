const path = require('path');

const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/projects', shopController.getProjects);


module.exports = router;