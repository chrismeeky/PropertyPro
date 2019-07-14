"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var schema = _joi["default"].object().keys({
  property_id: _joi["default"].number().required(),
  created_on: _joi["default"].string().required(),
  reason: _joi["default"].string().trim().required(),
  description: _joi["default"].string().trim().required()
});

var _default = schema;
exports["default"] = _default;