"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = _joi["default"].object().keys({
  property_id: _joi["default"].number().required(),
  created_on: _joi["default"].string().required(),
  reason: _joi["default"].string().trim().required(),
  description: _joi["default"].string().trim().required()
});

var _default = schema;
exports["default"] = _default;