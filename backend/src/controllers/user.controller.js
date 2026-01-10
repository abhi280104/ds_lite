const userService = require("../services/user.service");

const userController = {
    async findCurrentUser(req, res) {
        try {
            const user = await userService.findUserByEmail(req.user.email);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async findByUserName(req, res) {
        try {
            const { name } = req.query;
            const users = await userService.findUserByName(name);

            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async findByUserId(req, res) {
        try {
            const { id } = req.query;
            if (!id) {
                throw new Error("User id is required");
            }
            const user = await userService.findUserById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}


module.exports = userController;
