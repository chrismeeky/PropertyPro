"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _users = _interopRequireDefault(require("./routes/users"));

var _agents = _interopRequireDefault(require("./routes/agents"));

var _databases = require("./db/databases");

/* eslint-disable no-tabs */
require("babel-core/register");

require("babel-polyfill");

require("babel-core/register");

require("babel-polyfill");

(0, _databases.createProperty)();
(0, _databases.createUsers)();
(0, _databases.createFlags)();
var PORT = process.env.PORT || 5000;
var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use('/api/v1', _users["default"]);
app.use('/api/v1', _agents["default"]);
app.use(function (req, res) {
  return res.status(405).json({
    status: 'error',
    error: 'route not found or wrong request method'
  });
});
app.listen(PORT, console.log("server started on port ".concat(PORT)));
var _default = app;
exports["default"] = _default;