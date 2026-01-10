const bcrypt = require("bcrypt");
const UserRepository = require("../repositories/user.repository");
const jwt = require("jsonwebtoken");

const UserService = {
    async registerUser({ email, password, name }) {
        if (!email || !password || !name) {
            throw new Error("All fields are required");
        }
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await UserRepository.createUser({ email, passwordHash, name });
        return user;
    },

    async loginUser({ email, password }) {
        if (!email || !password) {
            throw new Error("All fields are required");
        }
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        return { user, token };
    }
}

module.exports = UserService;

