"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _verify_token = _interopRequireDefault(require("../middlewares/verify_token"));

var _verify_property = _interopRequireDefault(require("../helpers/verify_property"));

var _verify_signin = _interopRequireDefault(require("../middlewares/verify_signin"));

var _multer2 = _interopRequireDefault(require("../middlewares/multer"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _joi = _interopRequireDefault(require("joi"));

var _property_schema = _interopRequireDefault(require("../Schemas/property_schema"));

var _extract_errors = _interopRequireDefault(require("../helpers/extract_errors"));

var _pool = _interopRequireDefault(require("../config/pool"));

var _generateId = _interopRequireDefault(require("../helpers/generateId"));

/* eslint-disable linebreak-style */
var agentRouter = _express["default"].Router();

require('dotenv').config();

require('../config/cloudinary');

agentRouter.post('/auth/signin', _multer2["default"].array(), _verify_signin["default"], function (req, res) {
  _jsonwebtoken["default"].sign(req.user, 'secretkey', function (err, tokens) {
    if (err) {
      return res.status(417).json({
        status: 'error',
        error: err
      });
    } else {
      var id = parseInt(req.user.id, 10);
      return res.status(200).json({
        status: 'success',
        data: {
          token: tokens,
          id: id,
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          email: req.user.email
        }
      });
    }
  });
});
agentRouter.post('/property', _multer2["default"].single('image_url'), _verify_token["default"], _verify_property["default"], _generateId["default"],
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var property, result, formInputs, propertyFields;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            property = req.property;
            _context.next = 3;
            return _cloudinary["default"].v2.uploader.upload(req.file.path);

          case 3:
            result = _context.sent;

            if (!result.url.includes('cloudinary')) {
              _context.next = 11;
              break;
            }

            property.image_url = result.url;
            formInputs = {
              status: property.status,
              title: property.title,
              description: property.description,
              price: property.price,
              purpose: property.purpose,
              state: property.state,
              city: property.city,
              address: property.address,
              type: property.type,
              created_on: property.created_on,
              image_url: property.image_url,
              owner_email: property.ownerEmail,
              owner_phone_number: property.ownerphone_number
            };
            propertyFields = [req.id, property.owner_id, property.status, property.title, property.description, property.price, property.purpose, property.state, property.city, property.address, property.type, property.created_on, property.image_url, property.owner_email, property.owner_phone_number];

            _joi["default"].validate(formInputs, _property_schema["default"], function (error, result) {
              if (error) {
                var errors = (0, _extract_errors["default"])(error);
                console.log(errors);
                return res.status(406).json({
                  status: 'error',
                  error: error
                });
              } else {
                _pool["default"].connect(function (err, client, done) {
                  if (err) {
                    return res.status(417).json(err);
                  }

                  client.query('INSERT INTO property (id,owner,status, title,description, price, purpose, state, city, address, type, created_on, image_url,owner_email,owner_phone_number) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)', propertyFields, function (ERR, result) {
                    done();

                    if (ERR) {
                      return res.status(409).json({
                        status: 'error',
                        error: ERR.detail
                      });
                    }

                    var owner = parseInt(property.ownerId, 10);
                    console.log(req.property.owner_id);
                    return res.status(201).json({
                      status: 'success',
                      data: {
                        id: req.id,
                        owner: req.property.owner_id,
                        status: property.status,
                        title: property.title,
                        description: property.description,
                        price: property.price,
                        purpose: property.purpose,
                        state: property.state,
                        city: property.city,
                        address: property.address,
                        type: property.type,
                        created_on: property.created_on,
                        image_url: property.image_url
                      }
                    });
                  });
                });
              }
            });

            _context.next = 12;
            break;

          case 11:
            return _context.abrupt("return", res.status(406).json({
              status: "error",
              error: 'image URL does not exist'
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
agentRouter.patch('/property/:id', _multer2["default"].single('image_url'), _verify_token["default"],
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var id, property, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            property = req.body;

            if (!req.file) {
              _context2.next = 7;
              break;
            }

            _context2.next = 5;
            return _cloudinary["default"].v2.uploader.upload(req.file.path);

          case 5:
            result = _context2.sent;
            property.image_url = result.url;

          case 7:
            _jsonwebtoken["default"].verify(req.token, 'secretkey', function (err, authData) {
              if (err) {
                return res.sendStatus(401).json({
                  status: 'error',
                  error: 'token verification failed'
                });
              } else {
                _pool["default"].connect(function (err, client, done) {
                  if (err) {
                    return res.status(408).json({
                      status: 'error',
                      error: err
                    });
                  }

                  client.query('SELECT * FROM property WHERE id = $1 ', [id], function (err, results) {
                    if (results.rows.length === 0) {
                      return res.status(404).json({
                        status: 'error',
                        error: "property with id: ".concat(id, " couldn't be updated because it does not exist")
                      });
                    }

                    if (parseInt(authData.id, 10) !== parseInt(results.rows[0].owner, 10) && !authData.is_admin) {
                      return res.status(401).json({
                        status: 'error',
                        error: 'Only property owner or an Admin can update a property'
                      });
                    }

                    var formInputs = {
                      status: property.status || results.rows[0].status,
                      title: property.title || results.rows[0].title,
                      description: property.description || results.rows[0].description,
                      price: property.price || results.rows[0].price,
                      purpose: property.purpose || results.rows[0].purpose,
                      state: property.state || results.rows[0].state,
                      city: property.city || results.rows[0].city,
                      address: property.address || results.rows[0].address,
                      type: property.type || results.rows[0].type,
                      created_on: property.created_on || results.rows[0].created_on,
                      image_url: property.image_url || results.rows[0].image_url,
                      owner_email: property.owner_email,
                      owner_phone_number: property.owner_phone_number
                    };
                    var propertyFields = [formInputs.title, formInputs.description, formInputs.price, formInputs.purpose, formInputs.state, formInputs.city, formInputs.address, formInputs.type, formInputs.image_url, id];

                    _joi["default"].validate(formInputs, _property_schema["default"], function (error, result) {
                      if (error) {
                        var errors = (0, _extract_errors["default"])(error);
                        console.log(errors);
                        return res.status(406).json({
                          status: 'error',
                          errors: errors
                        });
                      } else {
                        client.query('UPDATE property SET title = $1,description = $2,price = $3,purpose = $4,state = $5,city = $6, address = $7, type = $8, image_url = $9 WHERE id = $10', propertyFields, function (ERR, result) {
                          done();

                          if (ERR) {
                            return res.status(409).json({
                              status: 'error',
                              error: ERR.detail
                            });
                          } else {
                            client.query('SELECT * FROM property WHERE id = $1', [id], function (err, result) {
                              return res.status(200).json({
                                status: 'success',
                                data: {
                                  id: parseInt(id, 10),
                                  status: result.rows[0].status,
                                  title: result.rows[0].title,
                                  description: result.rows[0].description,
                                  price: parseFloat(result.rows[0].price),
                                  purpose: result.rows[0].purpose,
                                  state: result.rows[0].state,
                                  city: result.rows[0].city,
                                  address: result.rows[0].address,
                                  type: result.rows[0].type,
                                  created_on: result.rows[0].created_on,
                                  image_url: result.rows[0].image_url
                                }
                              });
                            });
                          }
                        });
                      }
                    });
                  });
                });
              }
            });

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
agentRouter.patch('/property/:id/sold', _verify_token["default"], function (req, res) {
  _jsonwebtoken["default"].verify(req.token, 'secretkey', function (err, authData) {
    if (err) {
      return res.status(401).json({
        status: 'error',
        error: err
      });
    } else {
      var id = req.params.id;

      _pool["default"].connect(function (err, client, done) {
        if (err) {
          return res.status(408).json({
            status: 'error',
            error: err
          });
        }

        client.query('SELECT * FROM property WHERE id = $1', [id], function (err, result) {
          if (result.rows.length === 0) {
            return res.status(404).json({
              status: 'error',
              error: "property with id: ".concat(id, " couldn't be updated because it does not exist")
            });
          }

          var data = result.rows[0];
          data.price = parseFloat(result.rows[0].price);

          if (parseInt(authData.id, 10) !== parseInt(result.rows[0].owner, 10) && !authData.is_admin) {
            return res.status(401).json({
              status: 'error',
              error: 'Only property owner or an Admin can update a property'
            });
          } else {
            client.query('UPDATE property SET status = $1 WHERE id = $2', ['sold', id], function (err, result) {
              done();
              data.status = 'sold';

              if (!err) {
                return res.status(200).json({
                  status: 'success',
                  data: data
                });
              }
            });
          }
        });
      });
    }
  });
});
agentRouter["delete"]('/property/:id', _verify_token["default"], function (req, res) {
  _jsonwebtoken["default"].verify(req.token, 'secretkey', function (err, authData) {
    if (err) {
      return res.status(401).json({
        status: 'error',
        error: 'failed to validate your token'
      });
    } else {
      var id = req.params.id;

      _pool["default"].connect(function (err, client, done) {
        if (err) {
          return res.status(408).json(err);
        }

        client.query('SELECT * FROM property WHERE id = $1', [id], function (err, result) {
          if (result.rows.length === 0) {
            return res.status(404).json({
              status: 'error',
              error: "property with id: ".concat(id, " couldn't be deleted because it does not exist")
            });
          }

          if (parseInt(authData.id, 10) !== parseInt(result.rows[0].owner, 10) && !authData.is_admin) {
            return res.status(401).json({
              status: 'error',
              error: 'Only property owner or an Admin can delete a property'
            });
          } else {
            client.query('DELETE FROM property WHERE id = $1', [id], function (err, result) {
              done();

              if (!err) {
                return res.status(200).json({
                  status: 'success',
                  data: {
                    message: "property with id: ".concat(id, " has been successfully deleted")
                  }
                });
              }
            });
          }
        });
      });
    }
  });
});
var _default = agentRouter;
exports["default"] = _default;