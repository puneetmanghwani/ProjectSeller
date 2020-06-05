const path = require('path');

const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors')




const app = express();
app.use(cors())
app.get('/projects', function (req, res) {
    res.json('hello world')
  })

app.listen(8000);
