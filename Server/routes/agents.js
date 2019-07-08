/* eslint-disable linebreak-style */
import express from 'express';
import { Pool } from 'pg';
const agentRouter = express.Router();


import jwt from 'jsonwebtoken';
import verifyToken from '../middlewares/verify_token';
import verifyProperty from '../helpers/verify_property';
import verifySignin from '../middlewares/verify_signin';
import properties from '../db/properties';
import patchObject from '../helpers/patchobject';
import deleteProperty from '../helpers/deleteProperty';
import isPropertyFound from '../helpers/isPropertyFound';
require('dotenv').config();
require('../config/cloudinary');
import upload from '../middlewares/multer';
import cloudinary from 'cloudinary';
import Joi from 'joi';
import propertySchema from '../Schemas/property_schema'

import extractErrors from '../helpers/extract_errors';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'propertyprolite',
  password: 'mekusmekusdot666',
  port: 5432,
})


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
  let id;
  let property = req.property;

  const result = await cloudinary.v2.uploader.upload(req.file.path);
  if (result.url.includes('cloudinary')) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        return res.sendStatus(403);
      }
      else {
        property.image_url = result.url;
        const inputFields = {
          status: property.status,
          title: property.title,
          description: property.description,
          price: property.price,
          state: property.state,
          city: property.city,
          address: property.address,
          type: property.type,
          created_on: property.created_on,
          image_url: property.image_url,
          }
        Joi.validate(inputFields, propertySchema, (error, result) => {
          if (error) {
            const errors = extractErrors(error);
            console.log(errors);
            return res.status(401).json({
              status: 'error',
              errors,
            });
          }
          else {
            pool.connect((err, client, done) => {
              if (err) {
                return res.json(err);
              }
              client.query('INSERT INTO property (owner,status, title,description, price, state, city, address, type, created_on, image_url) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', [
                2,property.status, property.title, property.description, property.price, property.state, property.city, property.address, property.type, property.created_on, property.image_url
              ], (ERR, result) => {

                client.query('SELECT id from property where image_url  = $1 ', [property.image_url], (err, results) => {
                  id = results.rows[0].id;
                  return res.status(200).json({
                    status: 'success',
                    data: {
                    id,
                    owner: property.ownerId,
                    status: property.status,
                    title: property.title,
                    description: property.description,
                    price: property.price,
                    state: property.state,
                    city: property.city,
                    address: property.address,
                    type: property.type,
                    created_on: property.created_on,
                    image_url: property.image_url,
                    }
                  });

                })
              })
              done();
            })
          }
        })

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

agentRouter.patch('/property/:id', isPropertyFound, verifyToken, (req, res) => {

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.json({
        status: 'error',
        error: err
      });
    }
    else {
      let { id } = req.params;
      let data;
      properties.map((result) => {
        if (result.id === parseInt(id, 10)) {
          console.log(result.id)

          data = result;
          patchObject(data, req.body);
          return res.status(200).json({ data });
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
          return res.status(200).json({
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





export default agentRouter;
