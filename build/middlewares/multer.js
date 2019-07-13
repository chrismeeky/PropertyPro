"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-tabs */
var _default = (0, _multer["default"])({
  storage: _multer["default"].diskStorage({}),
  fileFilter: function fileFilter(req, file, cb) {
    if (!file.mimetype.match(/jpg|jpeg|png|gif/)) {
      cb(new Error('file is not supported'), false);
      return;
    }

    cb(null, true);
  }
});

exports["default"] = _default;