const { Router } = require('express');
const { check } = require('express-validator');
const { isValidObjectId } = require('mongoose');
const { createCategory, getCategories, getCategory, deleteCategory, updateCategory } = require('../controllers/category');
const { categorytExistById, categorytExistByName } = require('../helpers/db-validators');
const { validateJWT, validateFields, hasRole } = require('../middlewares');

const router = Router();

//Get all categories - public
router.get('/', getCategories)

//Get a category by ID - public
router.get('/:id', [
    check('id', 'Is not mongo id valid').isMongoId(),
    check('id').custom(categorytExistById),
    validateFields
],getCategory)

//Create a category  - private - any role
router.post('/', [
    validateJWT, 
    check('name', 'Name is required').not().isEmpty(),
    check('name').custom( categorytExistByName ),
    validateFields
], createCategory)

//Update a category  - private - any role
router.put('/:id', [
    validateJWT, 
    check('id', 'Is not mongo id valid').isMongoId(),
    check('id').custom(categorytExistById),
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], updateCategory)

//Delete a category  - private - admin
router.delete('/:id', [
    validateJWT, 
    hasRole('ADMIN_ROLE'),
    check('id', 'Is not mongo id valid').isMongoId(),
    check('id').custom(categorytExistById),
], deleteCategory)

module.exports = router;