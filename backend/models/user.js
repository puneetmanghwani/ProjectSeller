const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true},
    password: { type: String, required: true },
    cart:[{
        projectId :{
            type: Schema.Types.ObjectId,
            required:true
        },
        title: {
            type: String,
            required:true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
    }]
  });

UserSchema.methods.addToCart = function(cartItem) {
  const cartProjectIndex = this.cart.findIndex(cp => {
    return cp.projectId.toString() === cartItem.projectId.toString();
  });
  let newQuantity = 1;

  const updatedCartItems = [...this.cart];
  
  if (cartProjectIndex >= 0) {
    newQuantity = this.cart[cartProjectIndex].quantity + 1;
    updatedCartItems[cartProjectIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
        projectId : cartItem.projectId,
        title: cartItem.title,
        price: cartItem.price,
        quantity: newQuantity
    });
  }
  this.cart = updatedCartItems;
  return this.save();
};

UserSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(
            document.password, saltRounds,function(err, hashedPassword) {
                if (err) {
                    next(err);
                }
                else {
                    document.password = hashedPassword;
                    next();
                }
            }
        )
        
    }
    else {
        next();
    }
})
UserSchema.methods.isCorrectPassword = function(password,callback){
    bcrypt.compare(password,this.password,function(err,same){
        if(err){
            callback(err);
        }
        else{
            callback(err,same);
        }
    })
}
module.exports = mongoose.model('User', UserSchema);