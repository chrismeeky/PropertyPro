/* eslint-disable linebreak-style */
import express from 'express';
const agentRouter = express.Router();
import multer from 'multer';
import jwt from 'jsonwebtoken';
import verifyToken from '../middlewares/verify_token';
import verifyProperty from '../helpers/verify_property';
import verifySignin from '../middlewares/verify_signin';
require('dotenv').config();
require('../config/cloudinary');
import upload from '../middlewares/multer';
import cloudinary from 'cloudinary';
import Joi from 'joi';
import propertySchema from '../Schemas/property_schema'
import extractErrors from '../helpers/extract_errors';
import pool from '../config/pool';
import getId from '../helpers/generateId';

agentRouter.post('/auth/signin', upload.array(), verifySignin, (req, res) => {
  jwt.sign(req.user, 'secretkey', (err, tokens) => {
    if (err) {
      return res.status(417).json({
        status: 'error',
        error: err
      })
    }
    else {
      const id = parseInt(req.user.id, 10);
      return res.status(200).json({
        status: 'success',
        data: {
          token: tokens,
          id,
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          email: req.user.email,

        },
      });
    }
  });
});


agentRouter.post('/property', upload.single('image_url'), verifyToken, verifyProperty, getId, async (req, res) => {
  let property = req.property;


  const result = await cloudinary.v2.uploader.upload(req.file.path);
  if (result.url.includes('cloudinary')) {

    property.image_url = result.url;
    const formInputs = {
      status: property.status,
      title: property.title,
      description: property.description,
      price: property.price,
      purpose: property.purpose,
      state: property.state,
      city: property.city,
      address: property.address,
      type: property.type,
      created_on: property.created_on,
      image_url: property.image_url,
      owner_email: property.ownerEmail,
      owner_phone_number: property.ownerphone_number,
    }
    const propertyFields = [
      req.id,
      property.owner_id,
      property.status,
      property.title,
      property.description,
      property.price,
      property.purpose,
      property.state,
      property.city,
      property.address,
      property.type,
      property.created_on,
      property.image_url,
      property.owner_email,
      property.owner_phone_number]
    Joi.validate(formInputs, propertySchema, (error, result) => {
      if (error) {
        const errors = extractErrors(error);
        console.log(errors);
        return res.status(406).json({
          status: 'error',
          error,
        });
      }
      else {
        
          pool.query('INSERT INTO property (id,owner,status, title,description, price, purpose, state, city, address, type, created_on, image_url,owner_email,owner_phone_number) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)',
            propertyFields, (ERR, result) => {
              if (ERR) {
                return res.status(409).json({
                  status: 'error',
                  error: ERR.detail,
                });
              }
              console.log(req.property.owner_id)
              return res.status(201).json({
                status: 'success',
                data: {
                  id: req.id,
                  owner: req.property.owner_id,
                  status: property.status,
                  title: property.title,
                  description: property.description,
                  price: property.price,
                  purpose: property.purpose,
                  state: property.state,
                  city: property.city,
                  address: property.address,
                  type: property.type,
                  created_on: property.created_on,
                  image_url: property.image_url,
                }
              });


            })
      
      }
    })



  }

  else {
    return res.status(406).json({
      status: "error",
      error: 'image URL does not exist'
    })
  }

});



agentRouter.patch('/property/:id', upload.single('image_url'), verifyToken, async (req, res) => {
  const { id } = req.params;
  let property = req.body;
  let result;
  if (req.file) {

    result = await cloudinary.v2.uploader.upload(req.file.path);
    property.image_url = result.url;

  }

    pool.query('SELECT * FROM property WHERE id = $1 ', [id], (err, results) => {
      if (results.rows.length === 0) {
        return res.status(404).json({
          status: 'error',
          error: `property with id: ${id} couldn't be updated because it does not exist`,
        })
      }
      if (parseInt(req.authData.id, 10) !== parseInt(results.rows[0].owner, 10) && !req.authData.is_admin) {
        return res.status(401).json({
          status: 'error',
          error: 'Only property owner or an Admin can update a property'
        })
      }
      const formInputs = {
        status: property.status || results.rows[0].status,
        title: property.title || results.rows[0].title,
        description: property.description || results.rows[0].description,
        price: property.price || results.rows[0].price,
        purpose: property.purpose || results.rows[0].purpose,
        state: property.state || results.rows[0].state,
        city: property.city || results.rows[0].city,
        address: property.address || results.rows[0].address,
        type: property.type || results.rows[0].type,
        created_on: property.created_on || results.rows[0].created_on,
        image_url: property.image_url || results.rows[0].image_url,
        owner_email: property.owner_email,
        owner_phone_number: property.owner_phone_number,
      }
      const propertyFields = [
        formInputs.title,
        formInputs.description,
        formInputs.price,
        formInputs.purpose,
        formInputs.state,
        formInputs.city,
        formInputs.address,
        formInputs.type,
        formInputs.image_url,
        id,
      ]

      Joi.validate(formInputs, propertySchema, (error, result) => {
        if (error) {
          const errors = extractErrors(error);
          console.log(errors);
          return res.status(406).json({
            status: 'error',
            errors,
          });
        }


        else {
          pool.query('UPDATE property SET title = $1,description = $2,price = $3,purpose = $4,state = $5,city = $6, address = $7, type = $8, image_url = $9 WHERE id = $10',
            propertyFields, (ERR, result) => {
              
              if (ERR) {
                return res.status(409).json({
                  status: 'error',
                  error: ERR.detail,
                });
              }
              else {
                pool.query('SELECT * FROM property WHERE id = $1', [id], (err, result) => {
                  return res.status(200).json({
                    status: 'success',
                    data: {
                      id: parseInt(id, 10),
                      status: result.rows[0].status,
                      title: result.rows[0].title,
                      description: result.rows[0].description,
                      price: parseFloat(result.rows[0].price),
                      purpose: result.rows[0].purpose,
                      state: result.rows[0].state,
                      city: result.rows[0].city,
                      address: result.rows[0].address,
                      type: result.rows[0].type,
                      created_on: result.rows[0].created_on,
                      image_url: result.rows[0].image_url,
                    }
                  })
                })

              }

            })


        }
      })
    })
  

});





agentRouter.patch('/property/:id/sold', verifyToken, (req, res) => {

  let { id } = req.params;
    pool.query('SELECT * FROM property WHERE id = $1', [id], (err, result) => {

      if (result.rows.length === 0) {
        return res.status(404).json({
          status: 'error',
          error: `property with id: ${id} couldn't be updated because it does not exist`,
        })
      }
      const data = result.rows[0];
      data.price = parseFloat(result.rows[0].price)
      if (parseInt(req.authData.id, 10) !== parseInt(result.rows[0].owner, 10) && !req.authData.is_admin) {
        return res.status(401).json({
          status: 'error',
          error: 'Only property owner or an Admin can update a property'
        })
      }
      else {
        pool.query('UPDATE property SET status = $1 WHERE id = $2', ['sold', id], (err, result) => {
          
          data.status = 'sold';
          if (!err) {
            return res.status(200).json({
              status: 'success',
              data,
            })
          }
        })
      }

    });




});

agentRouter.delete('/property/:id', verifyToken, (req, res) => {

  let { id } = req.params;
  
    pool.query('SELECT * FROM property WHERE id = $1', [id], (err, result) => {

      if (result.rows.length === 0) {
        return res.status(404).json({
          status: 'error',
          error: `property with id: ${id} couldn't be deleted because it does not exist`,
        })
      }

      if (parseInt(req.authData.id, 10) !== parseInt(result.rows[0].owner, 10) && !req.authData.is_admin) {
        return res.status(401).json({
          status: 'error',
          error: 'Only property owner or an Admin can delete a property'
        })
      }
      else {
        pool.query('DELETE FROM property WHERE id = $1', [id], (err, result) => {
          if (!err) {
            return res.status(200).json({
              status: 'success',
              data: {
                message: `property with id: ${id} has been successfully deleted`
              }
            })
          }
        })
      }

    });



});

export default agentRouter;
