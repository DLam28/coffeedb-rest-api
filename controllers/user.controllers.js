const { response } = require("express"),
    bcryptjs = require("bcryptjs");

const User = require("../models/user");

const usersGet = async (req, res = response) => {
    const { max = 5, start = 0 } = req.query;
    const query = { status: true };

    try {
        const [total, user] = await Promise.all([
            User.countDocuments(query),
            User.find(query).skip(Number(start)).limit(Number(max)),
        ]);

        res.status(200).json({
            total,
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "There is an error in API User Get",
        });
    }
};

const userPost = async (req, res = response) => {
    const { name, email, password, role } = req.body,
        user = new User({ name, email, password, role });

    try {
        //Encrypt the password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        //Save to db
        await user.save();

        res.status(200).json({
            msg: "post API - Controller",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "There is an error in API User Post",
        });
    }
};

const userPut = async (req, res = response) => {
    const id = req.params.id;
    const { _id, password, google, email, ...userData } = req.body;

    try {
        if (password) {
            const salt = bcryptjs.genSaltSync();
            userData.password = bcryptjs.hashSync(password, salt);
        }

        const userDB = await User.findByIdAndUpdate(id, userData);

        res.status(200).json(userDB);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "There is an error in API User Put",
        });
    }
};

const userDelete = async (req, res = response) => {
    try {
        const { id } = req.params;

        const userDelete = await User.findByIdAndUpdate(id, { status: false });

        res.status(200).json({
            userDelete,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "There is an error in API User Delete",
        });
    }
};

const userPatch = (req, res = response) => {
    try {
        res.status(200).json({
            msg: "patch API - Controller",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "There is an error in API User Patch",
        });
    }
};

const notFound = (req, res = response) => {
    try {
        res.status(404).json({
            msg: "404 Not Found Api- Controller",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Page not found",
        });
    }
};

module.exports = {
    usersGet,
    userPost,
    userPut,
    userDelete,
    userPatch,
    notFound,
};
