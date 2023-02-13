const { response, json } = require("express");
const bcryptjs = require('bcryptjs');

const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

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
const googleSignIn = async (req, res=response) => {
    const {id_token} = req.body;

    try {
        const {name, img, email} = await googleVerify(id_token);
        let user = await User.findOne({email});
        if (!user) {

            //Create USER
            const data = {
                name, 
                email, 
                password: ':P', 
                role: 'USER_ROLE',
                img, 
                google: true
            };

            user = new User(data);
            await user.save();
        }


        // User in DB
        if (!user.status) {
            return res.status(401).json({
                msg: "User blocked"
            })
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            error,
            msg: 'Token cannot verify'
        })

    }
   

}
module.exports = {
    login,
    googleSignIn
}
