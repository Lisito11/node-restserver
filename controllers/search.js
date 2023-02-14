const {response} = require('express');
const { isValidObjectId } = require('mongoose');
const { User, Product, Category } = require('../models');

const collectionAllowed = [
    'users',
    'categories',
    'products',
    'roles'
];

const searchUsers = async (termino = "", res = response) => {

    const isMongoId = isValidObjectId(termino);

    if (isMongoId) {
        const user = await User.findById(termino);
        return res.json({
            results: user ? [user] : []
        });
    }
    
    const regex = new RegExp( termino, 'i')

    const users = await User.find({
        $or: [{name: regex}, {email:regex}],
        $and: [{status: true}]
    });
    return res.json({
        results: users
    });
}

const searchProducts = async (termino = "", res = response) => {

    const isMongoId = isValidObjectId(termino);

    if (isMongoId) {
        const product = await Product.findById(termino).populate('category', 'name');
        return res.json({
            results: product ? [product] : []
        });
    }
    
    const regex = new RegExp( termino, 'i')

    const products = await Product.find({
        $or: [{name: regex}, {price:regex}],
        $and: [{status: true}]
    }).populate('category', 'name');
    return res.json({
        results: products
    });
}


const searchCategories = async (termino = "", res = response) => {

    const isMongoId = isValidObjectId(termino);

    if (isMongoId) {
        const category = await Category.findById(termino);
        return res.json({
            results: category ? [category] : []
        });
    }
    
    const regex = new RegExp( termino, 'i')

    const categories = await Category.find({
        name: regex, status: true
    });
    return res.json({
        results: categories
    });
}

const search = async (req, res=response) => {
    const {collection, termino} = req.params

    if (!collectionAllowed.includes(collection)) {
        return res.status(400).json({
            msg: `Collections allowed are ${collectionAllowed}`
        });
    }

    switch (collection) {
        case 'users':
            searchUsers(termino, res)
            break;
        case 'categories':
            searchCategories(termino, res)
            break;

        case 'products':
            searchProducts(termino, res)
            break;
    
        default:
            res.status(500).json({
                msg: "Forget to do search"
            })
            break;
    }
}


module.exports = {
    search
}