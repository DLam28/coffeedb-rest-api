const Role = require("../models/role");
const User = require("../models/user");

const validateRole = async (role = "") => {
    const existRole = await Role.findOne({ role });

    if (!existRole) {
        throw new Error(`Role: '${role} is not registered in database.'`);
    }
};

const validateEmail = async (email = "") => {
    const emailExist = await User.findOne({ email });

    if (emailExist) {
        throw new Error(`Email '${email}' exist in database, try another.`);
    }
};

const existeUserById = async (id = "") => {
    const existUser = await User.findById(id);

    if (!existUser) {
        throw new Error(`Id '${id}' not exist in database.`);
    }
};

module.exports = {
    validateRole,
    validateEmail,
    existeUserById,
};
