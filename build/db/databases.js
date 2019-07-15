"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _pool = _interopRequireDefault(require("../config/pool"));

/* eslint-disable no-console */

/* eslint-disable no-tabs */
var createProperty = function createProperty() {
  var queryText = "CREATE TABLE IF NOT EXISTS property (\n            id integer not null,\n            owner int not null,\n            status text not null,\n            title text,\n            description text,\n            price numeric not null,\n            purpose text,\n            state text not null,\n            city text not null,\n            address text not null,\n            type text not null,\n            created_on text not null,\n            image_url text not null,\n            \"owner_email\" text not null,\n            \"owner_phone_number\" text not null)";

  _pool["default"].query(queryText).then(function (res) {})["catch"](function (err) {
    console.log(err);
  });
};

var createUsers = function createUsers() {
  var queryText = "CREATE TABLE IF NOT EXISTS users (\n\t\t\tid bigserial not null,\n\t\t\temail text not null primary key,\n\t\t\tfirst_name text not null,\n\t\t\tlast_name text not null,\n\t\t\tpassword text not null,\n\t\t\t\"phone_number\" text not null,\n\t\t\tstate text not null,\n\t\t\tcity text not null,\n\t\t\taddress text not null,\n\t\t\tis_admin boolean not null)";

  _pool["default"].query(queryText).then(function (res) {})["catch"](function (err) {
    console.log(err);
  });
};

var createFlags = function createFlags() {
  var queryText = "CREATE TABLE IF NOT EXISTS flags (\n            id bigserial not null,\n            property_id int not null,\n            created_on date not null,\n            reason text not null,\n            description text not null)";

  _pool["default"].query(queryText).then(function (res) {})["catch"](function (err) {
    console.log(err);
  });
};

var dropFlags = function dropFlags() {
  var queryText = "DROP TABLE IF EXISTS flags";

  _pool["default"].query(queryText).then(function (res) {})["catch"](function (err) {
    console.log(err);
  });
};

var dropProperty = function dropProperty() {
  var queryText = "DROP TABLE IF EXISTS property";

  _pool["default"].query(queryText).then(function (res) {})["catch"](function (err) {
    console.log(err);
  });
};

var dropUsers = function dropUsers() {
  var queryText = "DROP TABLE IF EXISTS users";

  _pool["default"].query(queryText).then(function (res) {})["catch"](function (err) {
    console.log(err);
  });
};

var createAdmin = function createAdmin() {
  var userFields = ['admin@email.com', 'admin_first_name', 'admin_last_name', 'admin_password', '09056557300', 'Enugu', 'Enugu', 'No 2 Odogwu street mbadiwe lane', true];
  var queryText = "DELETE FROM users where email = 'admin@email.com'";

  _pool["default"].query(queryText).then(function (res) {})["catch"](function (err) {
    console.log(err);
  });
};

module.exports = {
  createFlags: createFlags,
  createProperty: createProperty,
  createUsers: createUsers,
  dropFlags: dropFlags,
  dropProperty: dropProperty,
  dropUsers: dropUsers,
  createAdmin: createAdmin
};