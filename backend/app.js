const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();

app.use(cors())

const shopRoutes = require('./routes/shop');
const sellerRoutes = require('./routes/seller');
const userRoutes = require('./routes/userRoutes');
const withAuth = require('./middleware');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser());


app.use(shopRoutes);
app.use(sellerRoutes);
app.use('/user', userRoutes);
app.get('/checktoken', withAuth, function(req, res) {
  // res.sendStatus(200);
  res.json("hello");

})


mongoose
  .connect(
    'mongodb+srv://puneet:puneet@cluster0-adp1h.mongodb.net/<dbname>?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true}
  )
  .then(result => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
