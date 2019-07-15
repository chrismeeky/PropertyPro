"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var schema = _joi["default"].object().keys({
  email: _joi["default"].string().trim().email().required(),
  first_name: _joi["default"].string().trim().max(20).required(),
  last_name: _joi["default"].string().trim().max(20).required(),
  password: _joi["default"].string().trim().required(),
  phone_number: _joi["default"].string().trim().required(),
  state: _joi["default"].string().trim().required(),
  city: _joi["default"].string().trim().required(),
  address: _joi["default"].string().trim().required()
});

var _default = schema;
exports["default"] = _default;