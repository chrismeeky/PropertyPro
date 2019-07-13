"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint-disable array-callback-return */

/* eslint-disable consistent-return */

/* eslint-disable no-tabs */
var deleteProperty = function deleteProperty(properties, id, res) {
  var propertyIndex;
  properties.map(function (result, index) {
    if (result.id === parseInt(id, 10)) {
      propertyIndex = index;
      properties.splice(propertyIndex, 1);
      return res.status(200).json({
        status: 'success',
        data: {
          message: "property with an id: ".concat(id, " has been deleted successfully")
        }
      });
    }
  });
};

var _default = deleteProperty;
exports["default"] = _default;