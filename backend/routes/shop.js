const path = require('path');

const express = require('express');

const router = express.Router();
const withAuth = require('../middleware');
const shopController = require('../controllers/shop');

router.get('/projects', shopController.getProjects);
router.get('/project/:projectId', shopController.getProject);
router.post('/project/:projectId/addcomment', withAuth, shopController.addComment);
router.post('/project/addtocart', withAuth, shopController.addProjectToCart);
router.get('/cart', withAuth, shopController.getCartItems);
router.post('/placeorder', withAuth, shopController.postPlaceOrder);

module.exports = router;