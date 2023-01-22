const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req, res=response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Not token'
        });
    }

    try {

        // req.uid = uid;
        const {uid} = jwt.verify(token, process.env.SECRETKEY);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Token not valid - User not exist in database'
            })
        }


        // Verify status userAuth
        if (!user.status) {
            return res.status(401).json({
                msg: 'Token not valid - User deleted'
            })
        }



        req.userAuth = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token not valid'
        })
    }
}

module.exports = {
    validateJWT
}