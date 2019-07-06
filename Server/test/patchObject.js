/* eslint-disable no-tabs */
import { expect } from 'chai';
import patchObject from '../helpers/patchobject';

describe('A function that is used for patching an object using another object', () => {
	const Object1 = {
		id: 1,
		status: 'sold',
		price: 12525,
		type: '2 bedroom flat',
		state: 'Enugu',
		city: 'Nsukka',
		address: 'No 1 prisons road',
	};
	const Object2 = {
		status: 'available',
		price: 254025,
		state: 'Anambra',
	};
	it('should patch Object1 Using Object2', (done) => {
		patchObject(Object1, Object2);
		expect(Object1).to.be.an('object');
		expect(Object2).to.be.an('object');
		expect(Object1).to.have.property('status');
		expect(Object1.status).to.be.a('string');
		expect(Object1.status).to.equal(Object2.status);
		expect(Object1).to.have.property('price');
		expect(Object1.price).to.be.a('number');
		expect(Object1.price).to.equal(Object2.price);
		expect(Object1).to.have.property('state');
		expect(Object1.state).to.be.a('string');
		expect(Object1.state).to.equal(Object2.state);
		done();
	});
});
