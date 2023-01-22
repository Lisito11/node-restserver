

const {Router} = require('express');
const { check } = require('express-validator');
const { usersGet, usersPost, usersPut, usersDelete, usersPatch } = require('../controllers/user');
const { isRoleValid, emailExist, userExistById } = require('../helpers/db-validators');
const { validateFields, validateJWT, hasRole } = require('../middlewares');


const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be 6 letter or more').isLength({min:6}),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom( emailExist ),
    // check('role', 'Role not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isRoleValid ),
    validateFields
],usersPost);

router.put('/:id', [
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(userExistById),
    check('role').custom( isRoleValid ),
    validateFields
], usersPut);

router.delete('/:id',[
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(userExistById),
    validateFields
],usersDelete);

router.patch('/', usersPatch);





module.exports = router;
