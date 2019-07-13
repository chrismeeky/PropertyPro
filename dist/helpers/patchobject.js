"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint-disable no-tabs */

/* this function will patch the first parameter using the second */
var patchObject = function patchObject(object1, object2) {
  var target = object1;
  var source = object2;
  var targetKeys = Object.keys(target);
  var sourceKeys = Object.keys(source);

  for (var index = 0; index < sourceKeys.length; index += 1) {
    if (targetKeys.indexOf(sourceKeys[index]) > -1) {
      target[sourceKeys[index]] = source[sourceKeys[index]];
    }
  }
};

var _default = patchObject;
exports["default"] = _default;