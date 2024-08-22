const validateFields = require("../middlewares/validator");
const validateJWT = require("../middlewares/validate-jwt");
const validateRoles = require("../middlewares/validate-role");

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
};
