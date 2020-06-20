const path = require('path');

const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

const withAuth = require('../middleware');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./models/profileImages");
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}_${+new Date()}.jpg`);
    }
  });
const upload = multer({
  storage
});
router.post('/register',upload.single('image'), userController.register);
router.post('/login', userController.login);
router.get('/details',withAuth,userController.userDetails);


module.exports = router;

// upload.fields(['file'])