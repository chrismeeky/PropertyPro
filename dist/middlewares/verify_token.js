"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint-disable no-tabs */
var verifyToken = function verifyToken(req, res, next) {
  var bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(' '); // get token from array after split

    var token = bearer[1];
    req.token = token;
    next();
  } else {
    return res.status(401).json({
      status: 'error',
      error: 'A valid token is needed for authorization'
    });
  }
};

var _default = verifyToken;
exports["default"] = _default;