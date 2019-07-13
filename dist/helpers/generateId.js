"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pool = _interopRequireDefault(require("../config/pool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-tabs */
var generateId = function generateId(req, res, next) {
  var id;

  _pool["default"].connect(function (error, client, done) {
    if (error) {
      return res.json({
        status: 'error',
        error: error
      });
    }

    client.query('SELECT MAX(id) FROM property', function (err, result) {
      if (result === undefined) {
        id = 1;
      } else {
        id = result.rows[0].max + 1;
      }

      req.id = id;
      next();
    });
    done();
  });
};

var _default = generateId;
exports["default"] = _default;