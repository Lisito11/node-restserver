
const {response} = require('express');
const { Category } = require('../models');



const createCategory = async (req, res=response) => {

    
    const name = req.body.name.toUpperCase();

    const data = {
        name,
        user: req.userAuth._id,
    }
    const category = new Category(data);
    //Save DB
    await category.save();

    res.status(201).json({});
};

const getCategories = async (req, res=response) => {
    const {limit = 5, from = 0} = req.query;
    
    const query = {status: true };
    
    const categoriesq = Category.find(query)
    .populate('user', 'name')
    .skip(Number(from))
    .limit(Number(limit));

    const totalq = Category.countDocuments(query);

    const [total, categories] = await Promise.all([
        totalq,
        categoriesq
    ])

    res.json({
       total,
       categories
    });
}

const getCategory = async (req, res=response) => {
    const {id} = req.params;

    const category = await Category.findById(id).populate('user', { name: 1 })
    res.json({
        category
     });
}

const updateCategory = async (req, res=response) => {
    const {id} = req.params;
    const {status, user, ...data} = req.body;
    data.name = data.name.toUpperCase();
    data.user = req.userAuth._id;

    const category = await Category.findByIdAndUpdate(id, data, {new: true});
    res.json({
        category
    });
}

const deleteCategory = async (req, res=response) => {
    const {id} = req.params;
    const category = await Category.findByIdAndUpdate(id, {status: false})

    res.json({
        category
    });
}


module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}