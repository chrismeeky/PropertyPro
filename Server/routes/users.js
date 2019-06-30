/* eslint-disable linebreak-style */
const express = require('express');

const userRouter = express.Router();


const jwt = require('jsonwebtoken');
const verifySignup = require('../middlewares/verify_signup');
const verifySignin = require('../middlewares/verify_signin');
const properties = require('../db/properties');

userRouter.post('/api/signup', verifySignup, (req, res) => {
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



module.exports = userRouter;
