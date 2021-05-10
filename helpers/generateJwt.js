const jwt = require('jsonwebtoken');

const generateJwt = (uid = '') => {

    return new Promise((res, rej) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1h',
        }, (err, token) => {

            if (err) {
                console.log(err);
                rej('An error ocurred to token');
            } else {
                res(token);
            }

        })

    })

}



module.exports = {
    generateJwt
}