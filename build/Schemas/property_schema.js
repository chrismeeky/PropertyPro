"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var schema = _joi["default"].object().keys({
  status: _joi["default"].string().trim().min(4),
  price: _joi["default"].number().required(),
  state: _joi["default"].string().trim().required(),
  purpose: _joi["default"].string().trim().max(13),
  city: _joi["default"].string().trim().required(),
  address: _joi["default"].string().trim().required(),
  type: _joi["default"].string().trim().required(),
  title: _joi["default"].string().trim(),
  description: _joi["default"].string().trim(),
  created_on: _joi["default"].date().required(),
  image_url: _joi["default"].string().required(),
  ownerEmail: _joi["default"].string(),
  ownerPhoneNumber: _joi["default"].string()
});

var _default = schema;
exports["default"] = _default;