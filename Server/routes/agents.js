/* eslint-disable linebreak-style */
const express = require('express');

const agentRouter = express.Router();


const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verify_token');
const verifyProperty = require('../helpers/verify_property');
const properties = require('../db/properties');
const patchObject = require('../helpers/patchobject');
require('dotenv').config();
require('../config/cloudinary');
const upload = require('../middlewares/multer');
const cloudinary = require('cloudinary');


agentRouter.post('/create_blog', upload.single('image'), async (req, res) => {
  
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    res.send(result.url )
});


agentRouter.post('/property',upload.single('image_url'), verifyToken, verifyProperty,  async (req, res) => {
  let property = req.property;
  const result = await cloudinary.v2.uploader.upload(req.file.path);
 if(result.url.includes('cloudinary')){
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
        res.sendStatus(403);
    }
    else{
          property.image_url = result.url;
          properties.push(property);
        res.json({ status: 'success',
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

 else{
   return res.json({
     status: "error",
     error: 'image URL does not exist'
   })
 }
    
// console.log(req.body)
});





module.exports = agentRouter;
