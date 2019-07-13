const { Pool } = require('pg');
require('dotenv').config()
const pool = new Pool({
<<<<<<< HEAD
    connectionString: process.env.DB_LOCAL,
=======
    connectionString: process.env.DB_URI,
>>>>>>> develop
  })

  module.exports = pool;