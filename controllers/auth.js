const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res=response) => {

    const {email, password} = req.body;

    try {

        //Verify email exist
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: 'User not exist'
            });
        }

        //Verify user active
        if (!user.status) {
            return res.status(400).json({
                msg: 'User not exist : status'
            });
        }

        //Verify password
        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Password incorrect'
            });
        }

        //Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contact admin'
        });
    }


    
}

module.exports = {
    login
}
