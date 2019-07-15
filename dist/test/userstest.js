"use strict";

var _index = _interopRequireDefault(require("../index"));

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _generate_email = _interopRequireDefault(require("../helpers/generate_email"));

var _pool = _interopRequireDefault(require("../config/pool"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

_chai["default"].use(_chaiHttp["default"]);

var userToken;
var type = '4 bedroom flat';
var email = (0, _generate_email["default"])();
var userInfo = {
  first_name: 'Christian',
  last_name: 'Nwodo',
  email: email,
  password: 'testpassword123',
  address: 'No 2 busy street Mocha Avenue',
  phone_number: '0806587548',
  state: 'Enugu',
  city: 'Enugu'
};
var body = {
  status: 'sold',
  price: 12525,
  type: type,
  state: 'Enugu',
  city: 'Nsukka',
  address: 'No 1 prisons road'
};
describe('users property endpoints', function () {
  before('Get request token', function (done) {
    try {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(userInfo).end(function (err, res) {
        userToken = res.body.data.token;
        (0, _chai.expect)(res.status).to.equal(201);
        (0, _chai.expect)(res.body).to.have.property('status');
        (0, _chai.expect)(res.body.status).to.be.a('string');
        (0, _chai.expect)(res.body).to.have.property('data');
        (0, _chai.expect)(res.body.data).to.be.an('object');
        (0, _chai.expect)(res.body.data).to.have.property('token');
        (0, _chai.expect)(res.body.data.token).to.be.a('string');
        (0, _chai.expect)(res.body.data).to.have.property('id');
        (0, _chai.expect)(res.body.data.id).to.be.a('number');
        (0, _chai.expect)(res.body.data).to.have.property('first_name');
        (0, _chai.expect)(res.body.data.first_name).to.be.a('string');
        (0, _chai.expect)(res.body.data).to.have.property('last_name');
        (0, _chai.expect)(res.body.data.last_name).to.be.a('string');
        (0, _chai.expect)(res.body.data).to.have.property('email');
        (0, _chai.expect)(res.body.data.email).to.be.a('string');
        done();
      });
    } catch (error) {
      console.log(error);
    }
  });
  before('fjhkjhjheke', function () {});
  describe('POST /api/v1/auth/signin', function () {
    it('should be able to sign users in', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
        email: email,
        password: 'testpassword123'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body).to.have.property('status');
        (0, _chai.expect)(res.body.status).to.be.a('string');
        (0, _chai.expect)(res.body).to.have.property('data');
        (0, _chai.expect)(res.body.data).to.be.an('object');
        (0, _chai.expect)(res.body.data).to.have.property('token');
        (0, _chai.expect)(res.body.data.token).to.be.a('string');
        (0, _chai.expect)(res.body.data).to.have.property('id');
        (0, _chai.expect)(res.body.data.id).to.be.a('number');
        (0, _chai.expect)(res.body.data).to.have.property('first_name');
        (0, _chai.expect)(res.body.data.first_name).to.be.a('string');
        (0, _chai.expect)(res.body.data).to.have.property('last_name');
        (0, _chai.expect)(res.body.data.last_name).to.be.a('string');
        (0, _chai.expect)(res.body.data).to.have.property('email');
        (0, _chai.expect)(res.body.data.email).to.be.a('string');
        done();
      });
    });
  });
  describe('POST /api/v1/property', function () {
    it('should be able to create new property', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/property').set('authorization', "Bearer ".concat(userToken)).attach('image_url', './Server/test/dl.png').field(body).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(201);
        (0, _chai.expect)(res.body.status).to.equal('success');
        (0, _chai.expect)(res.body.data).to.be.an('object');
        (0, _chai.expect)(res.body).to.have.a.property('data');
        var result = res.body.data;
        (0, _chai.expect)(result).to.have.a.property('id');
        (0, _chai.expect)(result.id).to.be.a('number');
        (0, _chai.expect)(result).to.have.a.property('price');
        (0, _chai.expect)(result.price).to.be.a('number');
        (0, _chai.expect)(result).to.have.a.property('status');
        (0, _chai.expect)(result.status).to.be.a('string');
        (0, _chai.expect)(result).to.have.a.property('state');
        (0, _chai.expect)(result.state).to.be.a('string');
        (0, _chai.expect)(result).to.have.a.property('city');
        (0, _chai.expect)(result.city).to.be.a('string');
        (0, _chai.expect)(result).to.have.a.property('address');
        (0, _chai.expect)(result.address).to.be.a('string');
        (0, _chai.expect)(result).to.have.a.property('created_on');
        (0, _chai.expect)(result.created_on).to.be.a('string');
        (0, _chai.expect)(result).to.have.a.property('image_url');
        (0, _chai.expect)(result.image_url).to.be.a('string');
        done();
      });
    });
  });
  describe('POST /api/v1/property', function () {
    it('should return error when invalid property details are posted', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/property').set('authorization', "Bearer ".concat(userToken)).attach('image_url', './Server/test/dl.png').field({
        address: 'lets add just this address'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).equal(406);
        done();
      });
    });
  });
  describe('GET /property', function () {
    it('should get all property adverts', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/property').end(function (err, res) {
        var result = res.body.data;
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body.status).to.be.a('string');
        (0, _chai.expect)(result).to.be.an('array');
        (0, _chai.expect)(result[0]).to.have.a.property('id');
        (0, _chai.expect)(result[0].id).to.be.a('number');
        (0, _chai.expect)(result[0]).to.have.a.property('price');
        (0, _chai.expect)(result[0].price).to.be.a('number');
        (0, _chai.expect)(result[0]).to.have.a.property('status');
        (0, _chai.expect)(result[0].status).to.be.a('string');
        (0, _chai.expect)(result[0]).to.have.a.property('state');
        (0, _chai.expect)(result[0].state).to.be.a('string');
        (0, _chai.expect)(result[0]).to.have.a.property('city');
        (0, _chai.expect)(result[0].city).to.be.a('string');
        (0, _chai.expect)(result[0]).to.have.a.property('address');
        (0, _chai.expect)(result[0].address).to.be.a('string');
        (0, _chai.expect)(result[0]).to.have.a.property('created_on');
        (0, _chai.expect)(result[0].created_on).to.be.a('string');
        (0, _chai.expect)(result[0]).to.have.a.property('image_url');
        (0, _chai.expect)(result[0].image_url).to.be.a('string');
        done();
      });
    });
  });
  describe("GET /api/v1/property/?type=".concat(type), function () {
    it('should get specific property type', function (done) {
      _chai["default"].request(_index["default"]).get("/api/v1/property?type=".concat(type)).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body.status).to.equal('success');
        (0, _chai.expect)(res.body.data).to.be.an('array');
        (0, _chai.expect)(res.body).to.have.a.property('data');
        var result = res.body.data[0];
        (0, _chai.expect)(result).to.have.a.property('id');
        (0, _chai.expect)(result.id).to.be.a('number');
        (0, _chai.expect)(result).to.have.a.property('price');
        (0, _chai.expect)(result.price).to.be.a('number');
        (0, _chai.expect)(result).to.have.a.property('status');
        (0, _chai.expect)(result.status).to.be.a('string');
        (0, _chai.expect)(result).to.have.a.property('state');
        (0, _chai.expect)(result.state).to.be.a('string');
        (0, _chai.expect)(result).to.have.a.property('city');
        (0, _chai.expect)(result.city).to.be.a('string');
        (0, _chai.expect)(result).to.have.a.property('address');
        (0, _chai.expect)(result.address).to.be.a('string');
        (0, _chai.expect)(result).to.have.a.property('created_on');
        (0, _chai.expect)(result.created_on).to.be.a('string');
        (0, _chai.expect)(result).to.have.a.property('image_url');
        (0, _chai.expect)(result.image_url).to.be.a('string');
        done();
      });
    });
  });

  _pool["default"].connect(function (err, client, done) {
    client.query('SELECT MAX(id) from property', function (err, result) {
      var id = result.rows[0].max + 1;
      console.log(_typeof(id));
      describe('GET /api/v1/property/:<id>', function () {
        it('should get a specific property', function (done) {
          _chai["default"].request(_index["default"]).get("/api/v1/property/".concat(id)).end(function (err, res) {
            (0, _chai.expect)(res.status).to.equal(200);
            (0, _chai.expect)(res.body.status).to.equal('success');
            (0, _chai.expect)(res.body.data).to.be.an('object');
            (0, _chai.expect)(res.body).to.have.a.property('data');
            var result = res.body.data;
            (0, _chai.expect)(result).to.have.a.property('id');
            (0, _chai.expect)(result.id).to.be.a('number');
            (0, _chai.expect)(result).to.have.a.property('price');
            (0, _chai.expect)(result.price).to.be.a('number');
            (0, _chai.expect)(result).to.have.a.property('status');
            (0, _chai.expect)(result.status).to.be.a('string');
            (0, _chai.expect)(result).to.have.a.property('state');
            (0, _chai.expect)(result.state).to.be.a('string');
            (0, _chai.expect)(result).to.have.a.property('city');
            (0, _chai.expect)(result.city).to.be.a('string');
            (0, _chai.expect)(result).to.have.a.property('address');
            (0, _chai.expect)(result.address).to.be.a('string');
            (0, _chai.expect)(result).to.have.a.property('created_on');
            (0, _chai.expect)(result.created_on).to.be.a('string');
            (0, _chai.expect)(result).to.have.a.property('image_url');
            (0, _chai.expect)(result.image_url).to.be.a('string');
            done();
          });
        });
      });
      describe("PATCH /api/v1/property/".concat(id), function () {
        it('should be able to update property fields', function (done) {
          _chai["default"].request(_index["default"]).patch("/api/v1/property/".concat(id)).set('authorization', "Bearer ".concat(userToken)).send({
            title: 'unit testing title',
            state: 'Anambra'
          }).end(function (err, res) {
            (0, _chai.expect)(res.status).to.equal(200);
            (0, _chai.expect)(res.body).to.be.an('object');
            (0, _chai.expect)(res.body).to.have.a.property('data');
            var result = res.body.data;
            (0, _chai.expect)(result).to.have.a.property('id');
            (0, _chai.expect)(result.id).to.be.a('number');
            (0, _chai.expect)(result).to.have.a.property('price');
            (0, _chai.expect)(result.price).to.be.a('number');
            (0, _chai.expect)(result).to.have.a.property('status');
            (0, _chai.expect)(result.status).to.be.a('string');
            (0, _chai.expect)(result.status).to.equal('sold');
            (0, _chai.expect)(result).to.have.a.property('state');
            (0, _chai.expect)(result.state).to.be.a('string');
            (0, _chai.expect)(result.state).to.equal('Anambra');
            (0, _chai.expect)(result).to.have.a.property('city');
            (0, _chai.expect)(result.city).to.be.a('string');
            (0, _chai.expect)(result).to.have.a.property('address');
            (0, _chai.expect)(result.address).to.be.a('string');
            (0, _chai.expect)(result).to.have.a.property('created_on');
            (0, _chai.expect)(result.created_on).to.be.a('string');
            (0, _chai.expect)(result).to.have.a.property('image_url');
            (0, _chai.expect)(result.image_url).to.be.a('string');
            done();
          });
        });
      });
      describe("PATCH /api/v1/property/".concat(id, "/sold"), function () {
        it('should mark a property as sold', function () {
          _chai["default"].request(_index["default"]).patch("/api/v1/property/".concat(id, "/sold/")).set('authorization', "Bearer ".concat(userToken)).end(function (error, res) {
            (0, _chai.expect)(res.status).to.equal(200);
            (0, _chai.expect)(res.body).to.be.an('object');
            (0, _chai.expect)(res.body).to.have.a.property('data');
            var result = res.body.data;
            (0, _chai.expect)(result).to.have.a.property('id');
            (0, _chai.expect)(result.id).to.be.a('number');
            (0, _chai.expect)(result).to.have.a.property('price');
            (0, _chai.expect)(result.price).to.be.a('number');
            (0, _chai.expect)(result).to.have.a.property('status');
            (0, _chai.expect)(result.status).to.be.a('string');
            (0, _chai.expect)(result.status).to.equal('sold');
            (0, _chai.expect)(result).to.have.a.property('state');
            (0, _chai.expect)(result.state).to.be.a('string');
            (0, _chai.expect)(result).to.have.a.property('city');
            (0, _chai.expect)(result.city).to.be.a('string');
            (0, _chai.expect)(result).to.have.a.property('address');
            (0, _chai.expect)(result.address).to.be.a('string');
            (0, _chai.expect)(result).to.have.a.property('created_on');
            (0, _chai.expect)(result.created_on).to.be.a('string');
            (0, _chai.expect)(result).to.have.a.property('image_url');
            (0, _chai.expect)(result.image_url).to.be.a('string');
            done();
          });
        });
      });
      describe('POST /api/v1/property/:<id>', function () {
        it('should flag a property as fraudulent', function () {
          _chai["default"].request(_index["default"]).post("/api/v1/property/".concat(id)).send({
            reason: 'this is the reason the app is being flagged',
            description: 'this is the description'
          }).end(function (err, res) {
            (0, _chai.expect)(res.status).to.equal(201);
            (0, _chai.expect)(res.body).to.be.an('object');
            (0, _chai.expect)(res.body).to.have.property('status');
            (0, _chai.expect)(res.body.status).to.be.a('string');
            (0, _chai.expect)(res.body.status).to.equal('success');
            (0, _chai.expect)(res.body).to.have.property('data');
            (0, _chai.expect)(res.body.data).to.be.an('object');
            (0, _chai.expect)(res.body.data).to.have.property('message');
            (0, _chai.expect)(res.body.data.message).to.be.a('string');
            (0, _chai.expect)(res.body.data).to.have.property('details');
            (0, _chai.expect)(res.body.data.details).to.be.an('object');
            var details = res.body.data.details;
            (0, _chai.expect)(details).to.have.property('property_id');
            (0, _chai.expect)(details.property_id).to.be.a('number');
            (0, _chai.expect)(details).to.have.property('created_on');
            (0, _chai.expect)(details.created_on).to.be.a('string');
          });
        });
      });
      describe("DELETE /api/v1/property/".concat(id, "/"), function () {
        return [it('should be able to delete a property advert', function () {
          _chai["default"].request(_index["default"])["delete"]("/api/v1/property/".concat(id, "/")).set('authorization', "Bearer ".concat(userToken)).end(function (error, res) {
            console.log(res.body);
            (0, _chai.expect)(res.status).to.equal(200);
            (0, _chai.expect)(res.body).to.have.property('status');
            (0, _chai.expect)(res.body.status).to.equal('success');
            (0, _chai.expect)(res.body).to.have.property('data');
            (0, _chai.expect)(res.body.data).to.be.an('object');
            (0, _chai.expect)(res.body.data).to.have.property('message');
            (0, _chai.expect)(res.body.data.message).to.be.a('string');
            (0, _chai.expect)(res.body.data.message).to.equal("property with id: ".concat(id, " has been successfully deleted"));
            done();
          });
        })];
      });
    });
  });
});