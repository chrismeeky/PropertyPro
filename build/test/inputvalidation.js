"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _inputvalidation = _interopRequireDefault(require("../../Server/helpers/inputvalidation"));

/* eslint-disable no-unused-expressions */

/* eslint-disable no-tabs */
describe('Email Validation', function () {
  var validEmail = _inputvalidation["default"].validateEmail('nwodochristian@gmail.com');

  var invalidEmail = _inputvalidation["default"].validateEmail('nwodochristiangmail.com');

  it('should return true', function () {
    (0, _chai.expect)(validEmail).to.be["true"];
  });
  it('should return false', function () {
    (0, _chai.expect)(invalidEmail).to.be["false"];
  });
});
describe('Password validation', function () {
  var validPassword = _inputvalidation["default"].validatePassword('hdjksiejsh65');

  var invalidPassword = _inputvalidation["default"].validatePassword('');

  it('valid passowrd should return true', function () {
    (0, _chai.expect)(validPassword).to.be["true"];
  });
  it('invalid password should return false', function () {
    (0, _chai.expect)(invalidPassword).to.be["false"];
  });
});
describe('Phone number validation', function () {
  var validPhone = _inputvalidation["default"].validatePhone('08056985458');

  var invalidPhone = _inputvalidation["default"].validatePhone('');

  it('valid phone number should return true', function () {
    (0, _chai.expect)(validPhone).to.be["true"];
  });
  it('invalid phone number should return false', function () {
    (0, _chai.expect)(invalidPhone).to.be["false"];
  });
});
describe('First Name', function () {
  var validName = _inputvalidation["default"].validateFirstName('Emeka');

  var invalidName = _inputvalidation["default"].validateFirstName('');

  it('Valid first name should return true', function () {
    (0, _chai.expect)(validName).to.be["true"];
  });
  it('invalid first name should return false', function () {
    (0, _chai.expect)(invalidName).to.be["false"];
  });
});
describe('Last Name', function () {
  var validName = _inputvalidation["default"].validateLastName('Nwodo');

  var invalidName = _inputvalidation["default"].validateLastName('');

  it('Valid last name should return true', function () {
    (0, _chai.expect)(validName).to.be["true"];
  });
  it('invalid last name should return false', function () {
    (0, _chai.expect)(invalidName).to.be["false"];
  });
});
describe('Address', function () {
  var validAddress = _inputvalidation["default"].validateAddress('no 3 Maxwells street');

  var invalidAddress = _inputvalidation["default"].validateAddress('');

  it('Valid address should return true', function () {
    (0, _chai.expect)(validAddress).to.be["true"];
  });
  it('invalid address should return false', function () {
    (0, _chai.expect)(invalidAddress).to.be["false"];
  });
});
describe('Admin Type', function () {
  var validAdminType = _inputvalidation["default"].validateAdmin(false);

  var invalidAdminType = _inputvalidation["default"].validateAdmin('no');

  it('Valid admin type should return true', function () {
    (0, _chai.expect)(validAdminType).to.be["true"];
  });
  it('invalid admin type should return false', function () {
    (0, _chai.expect)(invalidAdminType).to.be["false"];
  });
});
describe('Property Status', function () {
  var emptyStatus = _inputvalidation["default"].validateSatus('');

  var validPropertyStatus = _inputvalidation["default"].validateSatus('sold');

  var invalidPropertyStatus = _inputvalidation["default"].validateSatus('how far');

  it('Empty property status should return available as default', function () {
    (0, _chai.expect)(emptyStatus).to.equal('available');
  });
  it('Valid property status should return status', function () {
    (0, _chai.expect)(validPropertyStatus).to.equal('sold');
  });
  it('invalid property status should return false', function () {
    (0, _chai.expect)(invalidPropertyStatus).to.be["false"];
  });
});
describe('Price validation', function () {
  var validPice = _inputvalidation["default"].validatePrice(2587);

  var invalidPice = _inputvalidation["default"].validatePrice('gjjjkf');

  it('Valid price should return true', function () {
    (0, _chai.expect)(validPice).to.be["true"];
  });
  it('invalid price should return false', function () {
    (0, _chai.expect)(invalidPice).to.be["false"];
  });
});
describe('State validation', function () {
  var validState = _inputvalidation["default"].validateState('Enugu');

  var invalidState = _inputvalidation["default"].validateState(8542);

  it('Valid state should return true', function () {
    (0, _chai.expect)(validState).to.be["true"];
  });
  it('invalid state should return false', function () {
    (0, _chai.expect)(invalidState).to.be["false"];
  });
});
describe('City validation', function () {
  var validCity = _inputvalidation["default"].validateCity('Nsukka');

  var invalidCity = _inputvalidation["default"].validateCity(8542);

  it('Valid city should return true', function () {
    (0, _chai.expect)(validCity).to.be["true"];
  });
  it('invalid city should return false', function () {
    (0, _chai.expect)(invalidCity).to.be["false"];
  });
});
describe('Type validation', function () {
  var validType = _inputvalidation["default"].validateType('2 Bedroom flat');

  var invalidType = _inputvalidation["default"].validateType('bedroom');

  it('valid type should return true', function () {
    (0, _chai.expect)(validType).to.be["true"];
  });
  it('invalid type should return false', function () {
    (0, _chai.expect)(invalidType).to.be["false"];
  });
});
describe('Image validation', function () {
  var req = {
    file: true,
    size: '200kb',
    file_type: 'png',
    file_name: 'my_duplex',
    file_path: 'C:/Users/user/Desktop'
  };

  var result = _inputvalidation["default"].validateImageUrl(req);

  it('valid image should return true', function () {
    (0, _chai.expect)(result).to.be["true"];
  });
});