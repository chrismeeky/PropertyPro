"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var refineData = function refineData(data) {
  var properties = data;
  properties.forEach(function (property) {
    var prop = property;
    prop.price = parseFloat(prop.price);
  });
  return properties;
};

var _default = refineData;
exports["default"] = _default;