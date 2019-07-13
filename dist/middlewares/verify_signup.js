"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _users_schema = _interopRequireDefault(require("../Schemas/users_schema"));

var _extract_errors = _interopRequireDefault(require("../helpers/extract_errors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-tabs */

/* eslint-disable linebreak-style */
var verifySignup = function verifySignup(req, res, next) {
  _joi["default"].validate(req.body, _users_schema["default"], function (error, result) {
    if (!error) {
      _bcrypt["default"].hash(req.body.password, 10, function (err, hash) {
        if (err) {
          return res.status(406).json({
            success: false,
            err: err
          });
        }

        req.body.password = hash;
        next();
      });
    } else {
      var errors = (0, _extract_errors["default"])(error);
      return res.status(406).json({
        status: 'error',
        errors: errors
      });
    }
  });
};

var _default = verifySignup;
exports["default"] = _default;