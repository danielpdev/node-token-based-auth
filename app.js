const express = require("express");
const bodyParser = require("body-parser");
const shortId = require('shortid');
const session = require('express-session');
const auth = require('./auth-routes');
const api = require('./token');
const jwt = require('jsonwebtoken'); 
const app = express();
const PORT = process.env.PORT || 4531 ;
const userModel = require('./models/');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send('Welcome to the Home of our APP');
})

app.use("/auth", auth.routes(userModel.user, api));

app.use((req, res, next) => {
  const token = req.headers['x-access-token'] || req.body.token;
  if (token) {
    jwt.verify(token, api.secretToken, (err, decoded) => {
      if(!err){
        req.decoded = decoded;
        next();
      } else {
        res.status(400).send('invalid token supplied');
      }
    });
  } else { 
    res.status(403).send('Authorization failed! please provide a valid token');
  }
});

app.get('/protected', (req, res) => {
  console.log(req.decoded);
  res.send(`You are seeing this because you have a valid session.
    	Your username is ${req.decoded.username} 
        and email is ${req.decoded.username}.
    `)
});

app.listen(PORT, () => {
  console.log(`app running port ${PORT}`)
})