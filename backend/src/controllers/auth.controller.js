const authService = require("../services/auth.service");

const authController = {
    async registerUser(req, res) {
        try {
            const { email, password, name } = req.body;
            const user = await authService.registerUser({ email, password, name });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token } = await authService.loginUser({ email, password });
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async logoutUser(req, res) {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            res.clearCookie("token");
            res.status(200).json({ message: "User logged out successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = authController;
