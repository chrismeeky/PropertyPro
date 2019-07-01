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
  let found = true;
  if(typeof req.query.type === 'string'){
    let holder = [];
    properties.map((prop) => {
      if(prop.type === req.query.type) {
        holder.push(prop)
        data = holder;
        found = true
      }
      else{
        found = false;
      }
    });
  }
  else{
    if(properties.length === 0){
      found = false;
    }
    else{
      data = properties;
    }
    
    }
    if(!found){
      return res.status(404).json({
        status: 'error',
        error: 'property does not exist'
      });  
    }
    else{
      return res.json({
        status: 200,
        data,
      })
    }
    
  
});

userRouter.get('/property/:id', (req, res) =>{
  const {id} = req.params;
  if(properties.length === 0) {
    return res.status(404).json({
      status: 'error',
      error: 'property does not exist'
    });
  }

  else{
    let found;
    properties.map((prop) => {
      
      if(prop.id === parseInt(id, 10)) {
        let data = prop;
        found = true;
        return res.json({
          status: 200,
          data,
        })
        
      }
            
    });
    if(!found){
return res.status(404).json({
      status: 'error',
      error: 'property does not exist'
    });
    }
  }
  
});

module.exports = userRouter;
