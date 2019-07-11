import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'propertyprolite',
    password: 'mekusmekusdot666',
    port: 5432,
  })

  export default pool;