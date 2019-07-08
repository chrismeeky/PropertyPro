/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-tabs */
import express from 'express';
import jwt from 'jsonwebtoken';
import {Pool} from 'pg';
import verifySignup from '../middlewares/verify_signup';
import isPropertyFound from '../helpers/isPropertyFound';

import properties from '../db/properties';

const userRouter = express.Router();
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'propertyprolite',
	password: 'mekusmekusdot666',
	port: 5432,
})


userRouter.post('/auth/signup', verifySignup, (req, res) => {
	const userData = req.body;
	let id;
	pool.connect((err, client, done) => {
		if (err) {
			return res.json(err);
		} else {
			client.query(
				'INSERT INTO USERS (email,first_name,last_name,password,phoneNumber,address, is_admin) VALUES($1,$2,$3,$4,$5,$6,$7)',
				[userData.email, userData.first_name, userData.last_name, userData.password, userData.phoneNumber, userData.address, userData.is_admin,
				],(err,result) =>{
					if(err) {
						return res.status(409).json({
							status: 'error',
							error: err.detail,
						});
					}
				client.query('SELECT id FROM users where email = $1',[req.body.email], (err, result) => {
					id = result.rows[0].id
					req.body.id = id;
					
					jwt.sign(req.body, 'secretkey', (error, tokens) => {
						if (err) {
							return res.json({
								status: 'error',
								error,
							});
						} else {
							return res.status(200).json({
								status: 'success',
								data: {
									id,
									token: tokens,
									first_name: req.body.first_name,
									last_name: req.body.last_name,
									email: req.body.email,
								},
							});
						}
					});
				})
				}
				);
				
		}
		done();
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

export default userRouter;
