const path = require('path');

const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/projects', shopController.getProjects);
router.get('/project/:projectId', shopController.getProject);

module.exports = router;