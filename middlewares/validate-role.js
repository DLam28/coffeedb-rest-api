const { request, response } = require("express")



const isAdminRole = (req = request, res = response, next) => {

    if (!req.user) { return res.status(500).json({ msg: 'Token required to do next step' }) }


    const { role, name } = req.user;

    if (role !== 'ADMIN_ROLE') { res.status(401).json({ msg: `${name} doesn't have ADMIN_ROLE to do this action.` }) }

    next();

}



const haveRole = (...roles) => {

    return (req = request, res = response, next) => {

        if (!req.user) { return res.status(500).json({ msg: 'Token required to do next step' }) }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({ msg: `Service require some of this roles: ${roles}` })
        }

        next();
    }

}



module.exports = {
    isAdminRole,
    haveRole
}