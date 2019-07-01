const express = require('express');
const upload = require('./multer');
const cloudinary = require('cloudinary');
const router = express.Router()
require('dotenv').config();
require('../config/cloudinary');

router.post('/create_blog', upload.single('image'), async (req, res, next) => {
     const result = await cloudinary.v2.uploader.upload(req.file.path)
            req.image_url = result.url;
            next();
    });

module.exports = router;
