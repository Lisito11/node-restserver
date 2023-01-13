const {response} = require('express');

const usersGet = (req, res=response) => {

    const {q, name="No name", apiKey} = req.query;

    res.json({
        msg: 'get AP - Controller',
        q,
        name,
        apiKey
    });
};

const usersPost = (req, res=response) => {


    const {name, age} = req.body;

    res.json({
        msg: 'post AP - Controller',
        name,
        age
    });
};

const usersPut = (req, res=response) => {

    const {id} = req.params;
    res.json({
        msg: 'put AP - Controller'
    });
};

const usersPatch = (req, res=response) => {
    res.json({
        msg: 'patch AP - Controller'
    });
};

const usersDelete = (req, res=response) => {
    res.json({
        msg: 'delete AP - Controller'
    });
};

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}