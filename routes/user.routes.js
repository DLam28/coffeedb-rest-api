const { Router } = require("express"),
    { check } = require("express-validator");

const { validateRole, validateEmail, existeUserById } = require("../helpers");

const { validateFields, validateJWT, haveRole } = require("../middlewares");

const {
    usersGet,
    userPost,
    userPut,
    userDelete,
    userPatch,
    notFound,
} = require("../controllers/user.controllers");

const { dbValidator } = require("../helpers");

const router = Router();

router.get("/", usersGet);

router.get("*", notFound);

router.post(
    "/",
    [
        check("name", "Name is required.").not().isEmpty(),
        check(
            "password",
            "Password is required and need to be 8 letters."
        ).isLength({ min: 8 }),
        check("email").custom(validateEmail),
        check("role").custom(validateRole),
        validateFields,
    ],
    userPost
);

router.put(
    "/:id",
    [
        check("id", "ID is not valid in mongoDB").isMongoId(),
        check("id").custom(existeUserById),
        check("role").custom(validateRole),
        validateFields,
    ],
    userPut
);

router.delete(
    "/:id",
    [
        validateJWT,
        haveRole("ADMIN_ROLE", "USER_ROLE"),
        check("id", "ID is not valid in mongoDB").isMongoId(),
        check("id").custom(existeUserById),
        validateFields,
    ],
    userDelete
);

router.patch("/", userPatch);

module.exports = router;
