const UserRepository = require("../repositories/user.repository");
const UserService = {
    async findUserByEmail(email) {
        const user = await UserRepository.findByEmail(email);
        return user;
    },
    async findUserByName(name) {
        const users = await UserRepository.findByName(name);
        //console.log(users);
        if (!users || users.length === 0) {
            throw new Error("User not found");
        }
        return users;
    },
    async findUserById(id) {
        const user = await UserRepository.findUserById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

}

module.exports = UserService;