const { validationResult } = require('express-validator');
const User = require('../models/user');


const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}



module.exports = {
    validateFields
}