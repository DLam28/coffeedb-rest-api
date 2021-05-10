const { Router } = require('express'),
    { check } = require('express-validator');
const { login } = require('../controllers/auth.controllers');
const { validateFields } = require('../middlewares/validator');

const router = Router();

// POST
router.post('/login', [
    check('email', 'Email is required.').isEmail(),
    check('password', 'Password is required.').not().isEmpty(),
    validateFields
], login);



module.exports = router;