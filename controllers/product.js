
const {response} = require('express');
const { Product } = require('../models');



const createProduct = async (req, res=response) => {

    const {price, category, description} = req.body
    const name = req.body.name.toUpperCase();

    const data = {
        name,
        user: req.userAuth._id,
        price,
        category,
        description,
    }
    const product = new Product(data);
    await product.save();

    res.status(201).json({
        product
    });
};

const getProducts = async (req, res=response) => {
    const {limit = 5, from = 0} = req.query;
    
    const query = {status: true };
    
    const productsq = Product.find(query)
    .populate('user', 'name')
    .populate('category', 'name')
    .skip(Number(from))
    .limit(Number(limit));

    const totalq = Product.countDocuments(query);

    const [total, products] = await Promise.all([
        totalq,
        productsq
    ])

    res.json({
       total,
       products
    });
}

const getProduct = async (req, res=response) => {
    const {id} = req.params;

    const product = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name');


    res.json({
        product
     });
}

const updateProduct = async (req, res=response) => {
    const {id} = req.params;
    const {status, user, ...data} = req.body;
    if (data.name) {
        data.name = data.name.toUpperCase();
    }

    data.user = req.userAuth._id;
    

    const product = await Product.findByIdAndUpdate(id, data, {new: true});
    res.json({
        product
    });
}

const deleteProduct = async (req, res=response) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, {status: false})

    res.json({
        product
    });
}


module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}