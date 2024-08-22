const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header("secret-token");

    if (!token) {
        res.status(401).json({ msg: "Token is required" });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);

        //Verify if uid == undefined
        if (!user) {
            return res.status(401).json({
                msg: "Token not valid - user deleted: user not exist in database",
            });
        }

        //Verify if uid status == true
        if (!user.status) {
            return res
                .status(401)
                .json({ msg: "Token not valid - user status: false" });
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({
            error: error,
        });
    }
};

module.exports = {
    validateJWT,
};
