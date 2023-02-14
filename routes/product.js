const { Router } = require('express');
const { check } = require('express-validator');
const { getProducts, getProduct, createProduct, deleteProduct, updateProduct } = require('../controllers/product');
const { productExistById, productExist, categorytExistById } = require('../helpers/db-validators');
const { validateJWT, validateFields, hasRole } = require('../middlewares');

const router = Router();

router.get('/', getProducts)

router.get('/:id', [
    check('id', 'Is not mongo id valid').isMongoId(),
    check('id').custom(productExistById),
    validateFields
],getProduct)

router.post('/', [
    validateJWT, 
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('category').custom(categorytExistById),
    check('name').custom( productExist ),
    validateFields
], createProduct)

router.put('/:id', [
    validateJWT, 
    check('id', 'Is not mongo id valid').isMongoId(),
    check('id').custom(productExistById),
    validateFields
], updateProduct)

router.delete('/:id', [
    validateJWT, 
    hasRole('ADMIN_ROLE'),
    check('id', 'Is not mongo id valid').isMongoId(),
    check('id').custom(productExistById),
    validateFields
], deleteProduct)

module.exports = router;