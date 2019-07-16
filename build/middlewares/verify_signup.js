"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _users_schema = _interopRequireDefault(require("../Schemas/users_schema"));

var _extract_errors = _interopRequireDefault(require("../helpers/extract_errors"));

var _inputvalidation = _interopRequireDefault(require("../helpers/inputvalidation"));

/* eslint-disable no-tabs */

/* eslint-disable linebreak-style */
var verifySignup = function verifySignup(req, res, next) {
  console.log(req.body);
  var error = '';

  if (!_inputvalidation["default"].validateEmail(req.body.email)) {
    error += 'email is invalid';
  }

  if (!_inputvalidation["default"].validateFirstName(req.body.first_name)) {
    error += ', first name is invalid';
  }

  if (!_inputvalidation["default"].validateLastName(req.body.last_name)) {
    error += ', last name is invalid';
  }

  if (!_inputvalidation["default"].validatePassword(req.body.password)) {
    error += ', password is invalid, ';
  }

  if (!_inputvalidation["default"].validateAddress(req.body.address)) {
    error += ', invalid address';
  }

  if (!_inputvalidation["default"].validatePhone(req.body.phone_number)) {
    error += ', invalid phone number';
  }

  if (error === '') {
    _bcrypt["default"].hash(req.body.password, 10, function (err, hash) {
      if (err) {
        return res.status(406).json({
          status: 'error',
          error: err
        });
      }

      req.body.password = hash;
      next();
    });
  } else {
    return res.status(406).json({
      status: 'error',
      error: error
    });
  }
};

var _default = verifySignup;
exports["default"] = _default;