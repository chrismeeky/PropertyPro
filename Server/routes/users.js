/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-tabs */
const express = require('express');

const userRouter = express.Router();


const jwt = require('jsonwebtoken');
const verifySignup = require('../middlewares/verify_signup');
const isPropertyFound = require('../helpers/isPropertyFound');

const properties = require('../db/properties');

userRouter.post('/auth/signup', verifySignup, (req, res) => {
	jwt.sign(req.user, 'secretkey', (err, tokens) => {
		if (err) {
			res.json({
				status: 'error',
				error: err,
			});
		} else {
			return res.status(200).json({
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
userRouter.get('/property/', isPropertyFound, (req, res) => {
	let data;
	if (typeof req.query.type === 'string') {
		const holder = [];
		properties.map((prop) => {
			if (prop.type === req.query.type) {
				holder.push(prop);
				data = holder;
			}
		});
	} else {
    		data = properties;
	}

	return res.json({
		status: 200,
		data,
	});
});

userRouter.get('/property/:id', isPropertyFound, (req, res) => {
	const { id } = req.params;
	properties.map((prop) => {
		if (prop.id === parseInt(id, 10)) {
			const data = prop;
			return res.status(200).json({
				status: 200,
				data,
			});
		}
	});
});

module.exports = userRouter;
