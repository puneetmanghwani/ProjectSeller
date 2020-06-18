const jwt = require('jsonwebtoken');
const multer = require('multer');

const User = require('../models/user');

const secret = 'helloworld';



// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, '../models/profileImages/');
//   },
//   filename: function (req, file, cb) {
//       cb(null, Date.now() + file.originalname);
//   }
// });
// const upload = multer({
//   storage: storage,
// });

exports.register = (req,res,next) => {
    const { email,name, password } = req.body;
    console.log(req.body);
    console.log(req.file);
    // console.log(req);
    const user = new User({ email,name, password });
    user.save(
        function(err){
            if(err){
                // console.log(err)
                res.status(401)
                .json("Error registering new user please try again.");
            }
            else{
                res.status(200).json("Welcome to Project Seller!");
            }
        }
    )
}

exports.login = (req,res,next) => {
    const { email, password } = req.body;
    User.findOne({ email }, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500)
          .json({
          error: 'Internal error please try again'
        });
      } else if (!user) {
        res.status(401)
          .json({
            error: 'Incorrect email or password'
          });
      } else {
        user.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500)
              .json({
                error: 'Internal error please try again'
            });
          } else if (!same) {
            res.status(401)
              .json({
                error: 'Incorrect email or password'
            });
          } else {
            // Issue token
            const payload = { 
              id: user._id,
              email: email,
              name : user.name
             };
            const token = jwt.sign(payload, secret, {
              expiresIn: '5h'
            });
            // res.cookie('token', token, { httpOnly: true })
            //   .sendStatus(200);
            res.json({
              success: true,
              token: token
            });
          }
        });
      }
    });
}
