const path = require('path');

const express = require('express');

const router = express.Router();

const sellerController = require('../controllers/seller');

router.post('/add-product', sellerController.postAddProject);


module.exports = router;