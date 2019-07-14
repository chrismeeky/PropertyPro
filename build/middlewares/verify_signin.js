"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _pool = _interopRequireDefault(require("../config/pool"));

/* eslint-disable no-tabs */

/* eslint-disable linebreak-style */
var user;

var verifySignin = function verifySignin(req, res, next) {
  _pool["default"].connect(function (err, client, done) {
    if (err) {
      return res.status(403).json({
        status: 'error',
        error: err
      });
    }

    client.query('SELECT * FROM users WHERE email = $1', [req.body.email], function (error, result) {
      if (result.rows.length === 0) {
        return res.status(404).json({
          status: 'error',
          error: 'User does not exist. Double check your email address and password'
        });
      }

      user = result.rows[0];

      _bcrypt["default"].compare(req.body.password, user.password, function (Err, rslt) {
        if (!rslt) {
          return res.status(401).json({
            status: 'error',
            error: 'Email and password do not match'
          });
        }

        req.user = user;
        next();
      });
    });
    done();
  });
};

var _default = verifySignin;
exports["default"] = _default;