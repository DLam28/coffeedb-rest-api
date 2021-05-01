const { response } = require('express'),
    bcryptjs = require('bcryptjs');

const User = require('../models/user');



const usersGet = async (req, res = response) => {
    // const { name = 'No name provided', page = 1, apikey = 0 } = req.query;
    const { max = 5, start = 0 } = req.query;
    const query = { status: true };

    const [total, user] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(start))
            .limit(Number(max))
    ]);

    res.status(200).json({
        total,
        user
    });
};

const userPost = async (req, res = response) => {

    const { name, email, password, role } = req.body,
        user = new User({ name, email, password, role });

    //Encrypt the password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt)

    //Save to db
    await user.save();

    res.status(200).json({
        msg: 'post API - Controller',
        user
    })

};

const userPut = async (req, res = response) => {
    const id = req.params.id;
    const { _id, password, google, email, ...userData } = req.body;

    //Validate password to password of db
    if (password) {
        const salt = bcryptjs.genSaltSync();
        userData.password = bcryptjs.hashSync(password, salt)
    }

    const userDB = await User.findByIdAndUpdate(id, userData);

    res.status(200).json(userDB);
};

const userDelete = async (req, res = response) => {

    const { id } = req.params;
    const userDelete = await User.findByIdAndUpdate(id, { status: false });

    res.status(200).json({
        userDelete
    })
};

const userPatch = (req, res = response) => {

    res.status(200).json({
        msg: 'patch API - Controller'
    })
}

const notFound = (req, res = response) => {

    res.status(404).json({
        msg: '404 Not Found Api- Controller'
    })
}

module.exports = {
    usersGet,
    userPost,
    userPut,
    userDelete,
    userPatch,
    notFound
};