const { Router } = require('express'),
    { check } = require('express-validator');

const {
    validateRole,
    validateEmail,
    existeUserById } = require('../helpers')

const {
    validateFields,
    validateJWT,
    myfunc,
    haveRole,
    isAdminRole } = require('../middlewares');

const { usersGet,
    userPost,
    userPut,
    userDelete,
    userPatch,
    notFound } = require('../controllers/user.controllers');

const { dbValidator } = require('../helpers');

const router = Router();


// GET
router.get('/', usersGet);



// Not found
router.get('*', notFound);



// POST
router.post('/', [
    check('name', 'Name is required.').not().isEmpty(),
    check('password', 'Password is required and need to be 8 letters.').isLength({ min: 8 }),
    check('role').custom(validateRole),
    check('email').custom(validateEmail),
    validateFields
], userPost);



// PUT
router.put('/:id', [
    check('id', 'ID is not valid in mongoDB').isMongoId(),
    check('id').custom(existeUserById),
    check('role').custom(validateRole),
    validateFields
], userPut);



// DELETE
router.delete('/:id', [
    validateJWT,
    // isAdminRole,
    haveRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'ID is not valid in mongoDB').isMongoId(),
    check('id').custom(existeUserById),
    validateFields
], userDelete);



// PATCH
router.patch('/', userPatch);


module.exports = router;