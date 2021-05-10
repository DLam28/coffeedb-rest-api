const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJwt } = require('../helpers/generateJwt');


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        //Verify the email of user
        if (!user) { return res.status(400).json({ msg: 'User/password is incorrect (EMAIL)' }) }

        //Verify the status of user
        if (!user.status) { return res.status(400).json({ msg: 'User/password is incorrect (Status false)' }) }

        //Verify password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) { return res.status(400).json({ msg: 'User/password is incorrect (Password)' }) }

        //Generate JWT
        const token = await generateJwt(user.id);

        res.json({
            msg: 'Login success',
            user,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: `There is an error ${error}`
        })
    }

};


module.exports = {
    login
}