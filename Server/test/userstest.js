/* eslint-disable no-tabs */
const chai = require('chai');
const { should } = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let userToken;
const type = '2 bedroom flat';
const id = '1';
const app = require('../index');

const userInfo = {
	email: 'emaka@gmail.com',
	password: 'testpassword123',
};
describe('users property endpoints', () => {
	before('Get request token', (done) => {
		try {
			chai.request(app)
				.post('/api/v1/auth/signin')
				.send(userInfo)
				.end((err, res) => {
					userToken = res.body.data.token;
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
		} catch (error) {
			console.log(error);
		}
	});
	describe('GET /property', () => {
		it('should get all property adverts', (done) => {
			chai.request(app)
				.get('/api/v1/property')
				.end((err, res) => {
					const result = res.body.data;

					expect(res.status).to.equal(200);
					expect(res.body.status).to.be.a('number');
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
	describe(`GET /api/v1/property/${id}`, () => {
		it('should get specific property type', (done) => {
			chai.request(app)
				.get(`/api/v1/property?type=${type}`)
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body.status).to.equal(200);
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

	describe('GET /api/v1/property/:<id>', () => {
		it('should get a specific property', (done) => {
			chai.request(app)
				.get(`/api/v1/property/${id}`)
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body.status).to.equal(200);
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

	describe('PATCH /api/v1/property/id', () => {
		it('should be able to update property fields', (done) => {
			chai.request(app)
				.patch('/api/v1/property/' + id)
				.set('authorization', `Bearer ${userToken}`)
				.send({
					status: 'available',
					state: 'Anambra'
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
					expect(result.status).to.equal('available');
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
	describe('PATCH /api/v1/property/:<id>/sold', () => {
		it('should mark a property as sold', (done) => {
			chai.request(app)
				.patch(`/api/v1/property/${id}/sold`)
				.set('authorization', `Bearer ${userToken}`)
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

	describe('DELETE /api/v1/property/:<id>', () => {
		it('should delete a specific property ad', (done) => {
			chai.request(app)
				.delete(`/api/v1/property/${id}`)
				.set('authorization', `Bearer ${userToken}`)
				.end((err, res) => {
					console.log(res.body);
					expect(res.status).to.equal(200);
					expect(res.body).to.have.property('status');
					expect(res.body.status).to.equal('success');
					expect(res.body).to.have.property('data');
					expect(res.body.data).to.be.an('object');
					expect(res.body.data).to.have.property('message');
					expect(res.body.data.message).to.be.a('string');
					expect(res.body.data.message).to.equal(`property with an id: ${id} has been deleted successfully`);
					done();
				});
		});
	});

	describe('POST /api/v1/auth/signup', () => {
		it('should be able to sign users up', (done) => {
			chai.request(app)
				.post('/api/v1/auth/signup')
				.send({
					first_name: 'Christian',
					last_name: 'Nwodo',
					email: 'nwodochristian@gmail.com',
					password: 'thisisapass123',
					address: 'no 2 Mbadiwe street',
					phone_number: '08587458958',
					is_admin: false,
				})
				.end((err, res) => {
					console.log(res.body);
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
		const body = {
			id: 1,
			status: 'sold',
			price: '12525',
			type: '2 bedroom flat',
			state: 'Enugu',
			city: 'Nsukka',
			address: 'No 1 prisons road',

		};
		it('should be able to create new property', (done) => {
			chai.request(app)
				.post('/api/v1/property')
				.set('authorization', `Bearer ${userToken}`)
				.attach('image_url', './Server/test/dl.png')
				.field(body)
				.end((err, res) => {
					console.log(res.body);
					expect(res.status).to.equal(200);
					expect(res.body.status).to.equal('success');
					expect(res.body.data).to.be.an('object');
					expect(res.body).to.have.a.property('data');
					const result = res.body.data;
					expect(result).to.have.a.property('id');
					expect(result.id).to.be.a('number');
					expect(result).to.have.a.property('price');
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
});
