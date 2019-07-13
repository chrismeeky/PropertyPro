"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var generateRandomUser = function generateRandomUser() {
  var alphabets = ['jude', 'jane', 'emeka', 'tolu', 'mbakwe', 'halima', 'akpan', 'benjamin', 'musa', 'chidinma'];
  var domains = ['yahoo.com', 'gmail.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'cnn.com', 'mail.com', 'co.uk', 'ymail.com', 'aol.com'];
  var randomNumber1 = Math.floor(Math.random() * 10);
  var randomNumber2 = Math.floor(Math.random() * 10);
  var randomNumber3 = Math.floor(Math.random() * 10);
  var randomNumber4 = Math.floor(Math.random() * 10);
  var domainCom = domains[randomNumber4];
  var firstString = alphabets[randomNumber1];
  var secondString = alphabets[randomNumber2];
  var thirdString = alphabets[randomNumber3];
  var userEmail = "".concat(firstString).concat(secondString).concat(thirdString).concat(randomNumber1).concat(randomNumber2, "@").concat(domainCom);
  return userEmail;
};

var _default = generateRandomUser;
exports["default"] = _default;