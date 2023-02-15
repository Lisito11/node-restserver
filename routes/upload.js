const {Router} = require('express');
const { check } = require('express-validator');
const { loadFile, updateImage, showImage, updateImageCloudinary } = require('../controllers/upload');
const { collectionsAllowed } = require('../helpers');
const { validateFiles } = require('../middlewares');

const router = Router();


router.post('/', validateFiles, loadFile);

// router.put('/:collection/:id', [
//     validateFiles,
//     check('id', 'Is not mongo id valid').isMongoId(),
//     check('collection').custom( c => collectionsAllowed( c, ['users', 'products'])),
// ], updateImage)

router.put('/:collection/:id', [
    validateFiles,
    check('id', 'Is not mongo id valid').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, ['users', 'products'])),
], updateImageCloudinary)

router.get('/:collection/:id', [
    check('id', 'Is not mongo id valid').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, ['users', 'products'])),
], showImage)

module.exports = router;