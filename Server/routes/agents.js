/* eslint-disable linebreak-style */
const express = require('express');

const agentRouter = express.Router();


const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verify_token');
const verifyProperty = require('../helpers/verify_property');
const verifySignin = require('../middlewares/verify_signin');
const properties = require('../db/properties');
const patchObject = require('../helpers/patchobject');
const deleteProperty = require('../helpers/deleteProperty');
const isPropertyFound = require('../helpers/isPropertyFound');
require('dotenv').config();
require('../config/cloudinary');
const upload = require('../middlewares/multer');
const cloudinary = require('cloudinary');


agentRouter.post('/auth/signin', verifySignin, (req, res) => {
  jwt.sign(req.user, 'secretkey', (err, tokens) => {
    if (err) {
      res.json({
        status: 'error',
        error: err
      })
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


agentRouter.post('/property', upload.single('image_url'), verifyToken, verifyProperty, async (req, res) => {
  let property = req.property;
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  if (result.url.includes('cloudinary')) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      }
      else {
        property.image_url = result.url;
        properties.push(property);
        res.json({
          status: 'success',
          data: {
            id: property.id,
            status: property.status,
            type: property.type,
            state: property.state,
            city: property.city,
            address: property.address,
            price: property.price,
            created_on: property.created_on,
            image_url: result.url,
          },
        });
      }
    });
  }

  else {
    return res.json({
      status: "error",
      error: 'image URL does not exist'
    })
  }

});

agentRouter.patch('/property/:id', verifyToken, isPropertyFound, (req, res) => {
  
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.json({
          status: 'error',
          error: err
        });
      }
      else {
        let { id } = req.params;
        let property;

        properties.map((result) => {
          if (result.id === parseInt(id, 10)) {
            property = result;
            patchObject(property, req.body);
            res.status(200).json({ property });
          }
        });

      }
    });
  });

agentRouter.patch('/property/:id/sold', verifyToken, isPropertyFound, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      return res.json({
        status: 'error',
        error: err
      });
    }
    else {
      let { id } = req.params;
      let property;
      properties.map((result) => {
        if (result.id === parseInt(id, 10)) {
          property = result;
          patchObject(property, { status: 'sold' });
          let data = property;
          return res.json({
            status: 'success',
            data
          });
        }
      });
    }
  });
  
});

agentRouter.delete('/property/:id', verifyToken, isPropertyFound, (req, res) => {
  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      return res.json({
        status: 'error',
        error: 'failed to validate your token'
      });
    }
    else {
      let { id } = req.params;
      deleteProperty(properties, id, res);    
     
    }
  });
  
});





module.exports = agentRouter;
