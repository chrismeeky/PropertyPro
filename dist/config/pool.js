"use strict";

var _require = require('pg'),
    Pool = _require.Pool;

require('dotenv').config();

var pool = new Pool({
  connectionString: process.env.DB_URI
});
module.exports = pool;