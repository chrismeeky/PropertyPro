/* eslint-disable linebreak-style */
const express = require('express');

const userRouter = express.Router();


const jwt = require('jsonwebtoken');
const verifySignup = require('../middlewares/verify_signup');

const properties = require('../db/properties');

userRouter.post('/auth/signup', verifySignup, (req, res) => {
        jwt.sign(req.user, 'secretkey', (err, tokens) => {
          if (err) {
            res.json({status: 'error',
                      error: err})
          }
          else {
            
      res.json({
        status: 'success',
        data: {
          token: tokens,
          id: req.user.id,
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          email: req.user.email,
        },
      });
    }
  });
});

// users can view all property adverts
userRouter.get('/property/', (req, res) =>{
  let data;
  if(typeof req.query.type === 'string'){
    let holder = [];
    properties.map((prop) => {
      if(prop.type === req.query.type) {
        holder.push(prop)
        data = holder;
              }
    });
  }
  else{
    data = properties;
    }
    return res.json({
      status: 403,
      data,
    })
});



module.exports = userRouter;
