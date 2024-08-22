const { Router } = require("express"),
    { check } = require("express-validator");

const { login, googleSignIn } = require("../controllers/auth.controllers");

const { validateFields } = require("../middlewares/validator");

const router = Router();

router.post(
    "/login",
    [
        check("email", "Email is required.").isEmail(),
        check("password", "Password is required.").not().isEmpty(),
        validateFields,
    ],
    login
);

router.post(
    "/google",
    [
        check("id_token", "id_token is required.").not().isEmpty(),
        validateFields,
    ],
    googleSignIn
);

module.exports = router;
