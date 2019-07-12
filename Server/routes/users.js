/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-tabs */
import express from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import verifySignup from '../middlewares/verify_signup';
import extractErrors from '../helpers/extract_errors';
import flagSchema from '../Schemas/flag_schema';
import pool from '../config/pool';


const userRouter = express.Router();

userRouter.post('/auth/signup', verifySignup, (req, res) => {
	const userData = req.body;
	const userFields = [
		userData.email,
		userData.first_name,
		userData.last_name,
		userData.password,
		userData.phoneNumber,
		userData.state,
		userData.city,
		userData.address,
		false];
	let id;
	pool.connect((err, client, done) => {
		if (err) {
			return res.status(408).json({
				status: 'error',
				error: err,
			});
		}

		client.query(
			'INSERT INTO USERS (email,first_name,last_name,password,phoneNumber,state, city, address, is_admin) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)',
			userFields, (error, result) => {
				if (error) {
					return res.status(409).json({
						status: 'error',
						error: error.detail,
					});
				}
				client.query('SELECT id FROM users where email = $1', [req.body.email], (Err, results) => {
					if (Err) {
						return res.status(404).json({
							status: 'error',
							error: err
						});
					}
					id = parseInt(results.rows[0].id, 10);

					jwt.sign(req.body, 'secretkey', (error, tokens) => {
						if (err) {
							return res.status(403).json({
								status: 'error',
								error,
							});
						} else {
							return res.status(201).json({
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
				});
			}
		);

		done();
	});

});

userRouter.post('/property/:id', (req, res) => {
	const { id } = req.params;
	pool.connect((err, client, done) => {
		if (err) {
			return res.status(408).json({
				status: 'error',
				error: err,
			});
		}
		client.query('SELECT * FROM property WHERE id = $1', [id], (error, result) => {
			if (result.rows.length === 0) {
				return res.status(404).json({
					status: 'error',
					error: `property with id: ${id} couldn't be flagged because it does not exist`,
				});
			}
			const day = new Date();
			const data = {
				property_id: id,
				created_on: day.toLocaleDateString(),
				reason: req.body.reason,
				description: req.body.description,
			}
			Joi.validate(data, flagSchema, (err, result) => {
				if (err) {
					const errors = extractErrors(err);
					return res.status(401).json({
						status: 'error',
						errors,
					});
				}
				client.query('INSERT INTO flags (property_id, created_on, reason, description) VALUES($1,$2,$3,$4)',
					[data.property_id, data.created_on, data.reason, data.description], (error, result) => {
						if (error) {
							return res.status(409).json({
								status: 'error',
								error: error.detail,
							});
						}
						return res.status(200).json({
							status: 'success',
							data: {
								message: 'We appreciate your feedback as it helps us fight spam and fraud',
								details: data,
							}
							
						})
					})
			})
		})
	});
})
// users can view all property adverts
userRouter.get('/property/', (req, res) => {
	let data;
	const type = req.query.type;
	pool.connect((err, client, done) => {

		if (err) {
			return res.status(408).json({
				status: 'error',
				error: err,
			})
		}
		if (typeof type !== 'undefined') {
			client.query('SELECT * FROM property where type = $1', [req.query.type], (error, result) => {
				
				if (result.rows.length === 0) {
					return res.status(404).json({
						status: 'error',
						error: 'Property does not exist',
					});
				}
				data = result.rows;
				
				return res.status(200).json({
					status: 200,
					data,
				});
			});

		}
		else {
			client.query('SELECT * FROM property', (error, result) => {
				if (result.rows.length === 0) {
					return res.status(404).json({
						status: 'error',
						error: 'Property does not exist',
					});
				}
				data = result.rows;
				return res.status(200).json({
					status: 200,
					data,
				});
			});
		}

	});


});

userRouter.get('/property/:id', (req, res) => {
	const { id } = req.params;
	pool.connect((err, client, done) => {
		if (err) {
			return res.status(408).json({
				status: 'error',
				error: err,
			});
		}
		client.query('SELECT * FROM property where id = $1', [id], (error, result) => {
			if (result.rows.length === 0) {
				return res.status(404).json({
					status: 'error',
					error: 'Property does not exist',
				});
			}
			const data = result.rows[0];
			return res.status(200).json({
				status: 'success',
				data,
			});
		});
		done();
	});
});

export default userRouter;
