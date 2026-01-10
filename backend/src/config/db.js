const { Pool } = require("pg");
const env = require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});


pool.connect((err, client, release) => {
    if (err) {
        console.error("Database connection error", err);
    } else {
        console.log("Database connected");
    }
});


module.exports = pool;
