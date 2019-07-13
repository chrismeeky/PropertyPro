"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var extractErrors = function extractErrors(errors) {
  var errorMessage = errors.details;
  var allMessage = '';
  errorMessage.forEach(function (err) {
    allMessage += err.message + ', ';
    console.log(allMessage);
  });
  return allMessage;
};

var _default = extractErrors;
exports["default"] = _default;