"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _properties = _interopRequireDefault(require("../db/properties"));

/* eslint-disable no-else-return */

/* eslint-disable array-callback-return */

/* eslint-disable consistent-return */

/* eslint-disable no-tabs */
var isPropertyFound = function isPropertyFound(req, res, next) {
  var found = false;

  if (_properties["default"].length > 0) {
    if (req.url === '/property' || req.url === '/property/') {
      return next();
    } else {
      var id = req.params.id;

      _properties["default"].map(function (result) {
        if (result.id === parseInt(id, 10) || result.type === req.query.type) {
          found = true;
          return next();
        }

        return next();
      });

      if (!found) {
        return res.status(404).json({
          status: 'error',
          error: 'property not found'
        });
      }
    }
  } else {
    return res.status(404).json({
      status: 'error',
      error: 'property not found'
    });
  }
};

var _default = isPropertyFound;
exports["default"] = _default;