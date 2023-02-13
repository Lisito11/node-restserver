const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
], login);

router.post('/google', [
    check('id_token', 'ID Token is required').not().isEmpty(),
], googleSignIn);

module.exports = router;