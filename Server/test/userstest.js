/* eslint-disable no-console */
/* eslint-disable no-tabs */
import app from '../index';
import { expect } from 'chai';
import chai from 'chai';

import chaiHttp from 'chai-http';
import generateRandomEmail from '../helpers/generate_email';
import pool from '../config/pool';

chai.use(chaiHttp);
let userToken;
const type = '4 bedroom flat';

const email = generateRandomEmail();
const userInfo = {
	first_name: 'Christian',
	last_name: 'Nwodo',
	email,
	password: 'testpassword123',
	address: 'No 2 busy street Mocha Avenue',
	phone_number: '0806587548',
	state: 'Enugu',
	city: 'Enugu',
};

const body = {
	status: 'sold',
	price: 12525,
	type,
	state: 'Enugu',
	city: 'Nsukka',
	address: 'No 1 prisons road',

};
describe('users property endpoints', () => {
	before('Get request token', (done) => {
		try {
			chai.request(app)
				.post('/api/v1/auth/signup')
				.send(userInfo)
				.end((err, res) => {
					userToken = res.body.data.token;
					expect(res.status).to.equal(201);
					expect(res.body).to.have.property('status');
					expect(res.body.status).to.be.a('string');
					expect(res.body).to.have.property('data');
					expect(res.body.data).to.be.an('object');
					expect(res.body.data).to.have.property('token');
					expect(res.body.data.token).to.be.a('string');
					expect(res.body.data).to.have.property('id');
					expect(res.body.data.id).to.be.a('number');
					expect(res.body.data).to.have.property('first_name');
					expect(res.body.data.first_name).to.be.a('string');
					expect(res.body.data).to.have.property('last_name');
					expect(res.body.data.last_name).to.be.a('string');
					expect(res.body.data).to.have.property('email');
					expect(res.body.data.email).to.be.a('string');
					done();
				});
		} catch (error) {
			console.log(error);
		}
	});
	before('fjhkjhjheke', () => {

	});
	describe('POST /api/v1/auth/signin', () => {
		it('should be able to sign users in', (done) => {
			chai.request(app)
				.post('/api/v1/auth/signin')
				.send({
					email,
					password: 'testpassword123',
				})
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.have.property('status');
					expect(res.body.status).to.be.a('string');
					expect(res.body).to.have.property('data');
					expect(res.body.data).to.be.an('object');
					expect(res.body.data).to.have.property('token');
					expect(res.body.data.token).to.be.a('string');
					expect(res.body.data).to.have.property('id');
					expect(res.body.data.id).to.be.a('number');
					expect(res.body.data).to.have.property('first_name');
					expect(res.body.data.first_name).to.be.a('string');
					expect(res.body.data).to.have.property('last_name');
					expect(res.body.data.last_name).to.be.a('string');
					expect(res.body.data).to.have.property('email');
					expect(res.body.data.email).to.be.a('string');
					done();
				});
		});
	});

	describe('POST /api/v1/property', () => {
		it('should be able to create new property', (done) => {
			chai.request(app)
				.post('/api/v1/property')
				.set('authorization', `Bearer ${userToken}`)
				.attach('image_url', './Server/test/dl.png')
				.field(body)
				.end((err, res) => {
					expect(res.status).to.equal(201);
					expect(res.body.status).to.equal('success');
					expect(res.body.data).to.be.an('object');
					expect(res.body).to.have.a.property('data');
					const result = res.body.data;
					expect(result).to.have.a.property('id');
					expect(result.id).to.be.a('number');
					expect(result).to.have.a.property('price');
					expect(result.price).to.be.a('number');
					expect(result).to.have.a.property('status');
					expect(result.status).to.be.a('string');
					expect(result).to.have.a.property('state');
					expect(result.state).to.be.a('string');
					expect(result).to.have.a.property('city');
					expect(result.city).to.be.a('string');
					expect(result).to.have.a.property('address');
					expect(result.address).to.be.a('string');
					expect(result).to.have.a.property('created_on');
					expect(result.created_on).to.be.a('string');
					expect(result).to.have.a.property('image_url');
					expect(result.image_url).to.be.a('string');
					done();
				});
		});
	});

	describe('POST /api/v1/property', () => {
		it('should return error when invalid property details are posted', (done) => {
			chai.request(app)
				.post('/api/v1/property')
				.set('authorization', `Bearer ${userToken}`)
				.attach('image_url', './Server/test/dl.png')
				.field({ address: 'lets add just this address' })
				.end((err, res) => {
					expect(res.status).equal(406);
					done();
				});
		});
	});


	describe('GET /property', () => {
		it('should get all property adverts', (done) => {
			chai.request(app)
				.get('/api/v1/property')
				.set('authorization', `Bearer ${userToken}`)
				.end((err, res) => {
					const result = res.body.data;
					expect(res.status).to.equal(200);
					expect(res.body.status).to.be.a('string');
					expect(result).to.be.an('array');
					expect(result[0]).to.have.a.property('id');
					expect(result[0].id).to.be.a('number');
					expect(result[0]).to.have.a.property('price');
					expect(result[0].price).to.be.a('number');
					expect(result[0]).to.have.a.property('status');
					expect(result[0].status).to.be.a('string');
					expect(result[0]).to.have.a.property('state');
					expect(result[0].state).to.be.a('string');
					expect(result[0]).to.have.a.property('city');
					expect(result[0].city).to.be.a('string');
					expect(result[0]).to.have.a.property('address');
					expect(result[0].address).to.be.a('string');
					expect(result[0]).to.have.a.property('created_on');
					expect(result[0].created_on).to.be.a('string');
					expect(result[0]).to.have.a.property('image_url');
					expect(result[0].image_url).to.be.a('string');
					done();
				});
		});
	});
	describe(`GET /api/v1/property/?type=${type}`, () => {
		it('should get specific property type', (done) => {
			chai.request(app)
				.get(`/api/v1/property?type=${type}`)
				.set('authorization', `Bearer ${userToken}`)
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body.status).to.equal('success');
					expect(res.body.data).to.be.an('array');
					expect(res.body).to.have.a.property('data');
					const result = res.body.data[0];
					expect(result).to.have.a.property('id');
					expect(result.id).to.be.a('number');
					expect(result).to.have.a.property('price');
					expect(result.price).to.be.a('number');
					expect(result).to.have.a.property('status');
					expect(result.status).to.be.a('string');
					expect(result).to.have.a.property('state');
					expect(result.state).to.be.a('string');
					expect(result).to.have.a.property('city');
					expect(result.city).to.be.a('string');
					expect(result).to.have.a.property('address');
					expect(result.address).to.be.a('string');
					expect(result).to.have.a.property('created_on');
					expect(result.created_on).to.be.a('string');
					expect(result).to.have.a.property('image_url');
					expect(result.image_url).to.be.a('string');
					done();
				});
		});
	});

	pool.connect((err, client, done) => {
		client.query('SELECT MAX(id) from property', (err, result) => {
			const id = result.rows[0].max + 1;
			describe('GET /api/v1/property/:<id>', () => {
				it('should get a specific property', (done) => {
					chai.request(app)
						.get(`/api/v1/property/${id}`)
						.set('authorization', `Bearer ${userToken}`)
						.end((err, res) => {
							console.log(res.body)
							expect(res.status).to.equal(200);
							expect(res.body.status).to.equal('success');
							expect(res.body.data).to.be.an('object');
							expect(res.body).to.have.a.property('data');
							const result = res.body.data;
							expect(result).to.have.a.property('id');
							expect(result.id).to.be.a('number');
							expect(result).to.have.a.property('price');
							expect(result.price).to.be.a('number');
							expect(result).to.have.a.property('status');
							expect(result.status).to.be.a('string');
							expect(result).to.have.a.property('state');
							expect(result.state).to.be.a('string');
							expect(result).to.have.a.property('city');
							expect(result.city).to.be.a('string');
							expect(result).to.have.a.property('address');
							expect(result.address).to.be.a('string');
							expect(result).to.have.a.property('created_on');
							expect(result.created_on).to.be.a('string');
							expect(result).to.have.a.property('image_url');
							expect(result.image_url).to.be.a('string');
							done();
						});
				});
			});
			describe(`PATCH /api/v1/property/${id}`, () => {
				it('should be able to update property fields', (done) => {
					chai.request(app)
						.patch(`/api/v1/property/${id}`)
						.set('authorization', `Bearer ${userToken}`)
						.send({
							title: 'unit testing title',
							state: 'Anambra',
						})
						.end((err, res) => {
							expect(res.status).to.equal(200);
							expect(res.body).to.be.an('object');
							expect(res.body).to.have.a.property('data');
							const result = res.body.data;
							expect(result).to.have.a.property('id');
							expect(result.id).to.be.a('number');
							expect(result).to.have.a.property('price');
							expect(result.price).to.be.a('number');
							expect(result).to.have.a.property('status');
							expect(result.status).to.be.a('string');
							expect(result.status).to.equal('sold');
							expect(result).to.have.a.property('state');
							expect(result.state).to.be.a('string');
							expect(result.state).to.equal('Anambra');
							expect(result).to.have.a.property('city');
							expect(result.city).to.be.a('string');
							expect(result).to.have.a.property('address');
							expect(result.address).to.be.a('string');
							expect(result).to.have.a.property('created_on');
							expect(result.created_on).to.be.a('string');
							expect(result).to.have.a.property('image_url');
							expect(result.image_url).to.be.a('string');
							done();
						});
				});
			});

			describe(`PATCH /api/v1/property/${id}/sold`, () => {
				it('should mark a property as sold', () => {
					chai.request(app)
						.patch(`/api/v1/property/${id}/sold/`)
						.set('authorization', `Bearer ${userToken}`)
						.end((error, res) => {
							expect(res.status).to.equal(200);
							expect(res.body).to.be.an('object');
							expect(res.body).to.have.a.property('data');
							const result = res.body.data;
							expect(result).to.have.a.property('id');
							expect(result.id).to.be.a('number');
							expect(result).to.have.a.property('price');
							expect(result.price).to.be.a('number');
							expect(result).to.have.a.property('status');
							expect(result.status).to.be.a('string');
							expect(result.status).to.equal('sold');
							expect(result).to.have.a.property('state');
							expect(result.state).to.be.a('string');
							expect(result).to.have.a.property('city');
							expect(result.city).to.be.a('string');
							expect(result).to.have.a.property('address');
							expect(result.address).to.be.a('string');
							expect(result).to.have.a.property('created_on');
							expect(result.created_on).to.be.a('string');
							expect(result).to.have.a.property('image_url');
							expect(result.image_url).to.be.a('string');
							done();

						})
				})
			})

			describe('POST /api/v1/property/:<id>', () => {
				it('should flag a property as fraudlent', () => {
					chai.request(app)
						.post(`/api/v1/property/fraud/${id}`)
						.send({
							reason: 'this is the reason the app is being flagged',
							description: 'this is the description',
						})
						.end((err, res) => {
							expect(res.status).to.equal(201);
							expect(res.body).to.be.an('object');
							expect(res.body).to.have.property('status');
							expect(res.body.status).to.be.a('string');
							expect(res.body.status).to.equal('success');
							expect(res.body).to.have.property('data');
							expect(res.body.data).to.be.an('object');
							expect(res.body.data).to.have.property('message');
							expect(res.body.data.message).to.be.a('string');
							expect(res.body.data).to.have.property('details');
							expect(res.body.data.details).to.be.an('object');
							const { details } = res.body.data;
							expect(details).to.have.property('property_id');
							expect(details.property_id).to.be.a('number');
							expect(details).to.have.property('created_on');
							expect(details.created_on).to.be.a('string');
						});
				});
			});

			describe(`DELETE /api/v1/property/${id}/`, () => [
				it('should be able to delete a property advert', () => {
					chai.request(app)
						.delete(`/api/v1/property/${id}/`)
						.set('authorization', `Bearer ${userToken}`)
						.end((error, res) => {
							expect(res.status).to.equal(200);
							expect(res.body).to.have.property('status');
							expect(res.body.status).to.equal('success');
							expect(res.body).to.have.property('data');
							expect(res.body.data).to.be.an('object');
							expect(res.body.data).to.have.property('message');
							expect(res.body.data.message).to.be.a('string');
							expect(res.body.data.message).to.equal(`property with id: ${id} has been successfully deleted`);
							done();
						})
				})
			])

			
		});
	});
});
