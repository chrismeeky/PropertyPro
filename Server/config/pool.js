const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DB_URI,
  })
  pool.connect((err, client) => {
		if (err) {
			throw err;
    }
  });
  module.exports = pool;
