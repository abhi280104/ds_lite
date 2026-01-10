const pool = require("../config/db");

const UserRepository = {
    async createUser({ email, passwordHash, name }) {
        const { rows } = await pool.query(
            `INSERT INTO users (email, password_hash, name)
       VALUES ($1, $2, $3)
       RETURNING id, email, name, is_email_verified, created_at`,
            [email, passwordHash, name]
        );
        return rows[0];
    },

    async findByEmail(email) {
        const { rows } = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );
        return rows[0];
    },

    async findByName(name) {
        const { rows } = await pool.query(
            `SELECT id, name, email
         FROM users
         WHERE name ILIKE $1`,
            [`%${name}%`]
        );
        return rows;
    },
    async findUserById(id) {
        const { rows } = await pool.query(
            `SELECT * FROM users WHERE id = $1`,
            [id]
        );
        return rows[0];
    }


}


module.exports = UserRepository;

