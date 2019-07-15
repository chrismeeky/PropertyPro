"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-tabs */

/* eslint-disable linebreak-style */
var ownerId;
var day = new Date();

var verifyProperty = function verifyProperty(req, res, next) {
  if (!req.file) {
    return res.status(415).json({
      status: 'error',
      error: 'You must attach a valid image'
    });
  }

  var property = {
    owner: ownerId,
    status: req.body.status || 'available',
    price: parseFloat(req.body.price),
    purpose: req.body.purpose || 'not provided',
    state: req.body.state,
    city: req.body.city,
    address: req.body.address,
    type: req.body.type,
    title: req.body.title || 'not provided',
    description: req.body.description || 'not provided',
    created_on: day.toLocaleDateString(),
    image_url: req.body.image_url
  };

  _jsonwebtoken["default"].verify(req.token, 'secretkey', function (err, authData) {
    if (err) {
      return res.sendStatus(403);
    }

    property.ownerId = authData.id;
    property.ownerEmail = authData.email;
    property.ownerphone_number = authData.phone_number;
    req.property = property;
    next();
  });
};

var _default = verifyProperty;
exports["default"] = _default;