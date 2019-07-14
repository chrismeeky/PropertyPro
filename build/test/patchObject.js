"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _patchobject = _interopRequireDefault(require("../helpers/patchobject"));

/* eslint-disable no-tabs */
describe('A function that is used for patching an object using another object', function () {
  var Object1 = {
    id: 1,
    status: 'sold',
    price: 12525,
    type: '2 bedroom flat',
    state: 'Enugu',
    city: 'Nsukka',
    address: 'No 1 prisons road'
  };
  var Object2 = {
    status: 'available',
    price: 254025,
    state: 'Anambra'
  };
  it('should patch Object1 Using Object2', function (done) {
    (0, _patchobject["default"])(Object1, Object2);
    (0, _chai.expect)(Object1).to.be.an('object');
    (0, _chai.expect)(Object2).to.be.an('object');
    (0, _chai.expect)(Object1).to.have.property('status');
    (0, _chai.expect)(Object1.status).to.be.a('string');
    (0, _chai.expect)(Object1.status).to.equal(Object2.status);
    (0, _chai.expect)(Object1).to.have.property('price');
    (0, _chai.expect)(Object1.price).to.be.a('number');
    (0, _chai.expect)(Object1.price).to.equal(Object2.price);
    (0, _chai.expect)(Object1).to.have.property('state');
    (0, _chai.expect)(Object1.state).to.be.a('string');
    (0, _chai.expect)(Object1.state).to.equal(Object2.state);
    done();
  });
});