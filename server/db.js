const pg = require('pg');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL, // comming from the .env file
  ssl: {
    rejectUnathorized: false
  }
});

module.exports = db;
