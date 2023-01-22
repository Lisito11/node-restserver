const {response} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async (req, res=response) => {

    // const {q, name="No name", apiKey} = req.query;
    const {limit = 5, from = 0} = req.query;
    
    const query = {status: true };
    
    const usersq = User.find(query)
    .skip(Number(from))
    .limit(Number(limit));

    const totalq = User.countDocuments(query);

    const [total, users] = await Promise.all([
        totalq,
        usersq
    ])


    res.json({
       total,
       users
    });
};

const usersPost = async (req, res=response) => {

    

    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    //verifiy email exist

    // const emailExist = await User.findOne({email});
    // if (emailExist) {
    //     return res.status(400).json({
    //         msg:"Email already register."
    //     })
    // }

    //encrypt password
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);
    //save db

    await user.save();

    res.json({
        user
    });
};

const usersPut = async (req, res=response) => {

    const {id} = req.params;
    const {_id, password, google, email, ...rest} = req.body;

    //TODO: Validate user in db
    if (password) {
        //encrypt password
        const salt = bcryptjs.genSaltSync(10);
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json({
        user
    });
};

const usersPatch = (req, res=response) => {
    res.json({
        msg: 'patch AP - Controller'
    });
};

const usersDelete = async (req, res=response) => {

    const {id} = req.params;
    // const uid = req.uid;

    // Delete from db
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {status: false})
    // const userAuth = req.userAuth

    res.json({
        user
    });

};

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}