const Project = require('../models/project');
const { post } = require('../routes/shop');
const User = require('../models/user');
const mailer =require('../utilites/mailer');

exports.getProjects = (req, res, next) => {
    Project.find()
      .then(projects => {
        res.json(projects);
      })
      .catch(err => {
        console.log(err);
      });
  };

exports.getProject = (req, res, next) => {
  const projectId = req.params.projectId;
  
  Project.findById(projectId)
    .then(project => {
        res.json(project);
    })
    .catch(err => console.log(err));
};


exports.addComment = (req, res, next) => {
  const projectId = req.params.projectId;
  const postComment = req.body.comment;
  const name = req.body.name;
  const comment = {
    name:name,
    comment:postComment
  }
  Project.findById(projectId)
    .then(project => {
        project.comments.push(comment);
        project.save();
    })
    .catch(err => console.log(err));
  res.json('commented');
};
  
exports.addProjectToCart = (req, res, next) => {
  
  const projectId = req.body.projectId;
  const userId = req.body.userId;
  Project.findById(projectId)
    .then(project => {
      cartItem={
        projectId : projectId,
        title: project.title,
        price: project.price
      }
        User.findById(userId)
        .then(user=>{
          user.addToCart(cartItem);
          res.json('added to cart');
        })
    })
    .catch(err => console.log(err));
};

exports.getCartItems = (req, res, next) => {
  userId=req.user.id
  User.findById(userId)
  .then(user=>{
    const cartItems=[...user.cart];
    res.json(cartItems);
  })
  
};

exports.postPlaceOrder = (req, res, next) => {
  var orderItems = req.body.orderItems;
  userId=req.user.id
  User.findById(userId)
  .then(user=>{
    mailer(user.email,orderItems);
    user.cart=[];
    user.save();
    res.json('Order Placed');
  })

  
};