const { Category, Role, User, Product } = require('../models');

const isRoleValid = async (role = '') => {
    const existRole = await Role.findOne({role});
    if (!existRole) {
        throw new Error(`Role ${role} no exist in db.`)
    }
}

const emailExist = async (email='') => {
    const exist = await User.findOne({email});
    if (exist) {
        throw new Error(`Email: ${email} already exist in db`)
    }
}

const userExistById = async (id='') => {
    const exist = await User.findById(id);
    if (!exist) {
        throw new Error(`Id: ${id} not exist in db`)
    }
}

const categorytExistById = async (id='') => {
    const exist = await Category.findById(id);
    if (!exist) {
        throw new Error(`Category: ${id} not exist in db`)
    }
}

const categorytExistByName = async (name='') => {
    const nameUpper = name.toUpperCase();
    const categoryDB = await Category.findOne({name: nameUpper})
    if (categoryDB) {
        throw new Error(`Category: ${name} already exist in db`)
    }
}

const productExist = async (name='') => {
    const nameUpper = name.toUpperCase();
    const productDB = await Product.findOne({name: nameUpper})
    if (productDB) {
        throw new Error(`Product: ${name} already exist in db`)
    }
}

const productExistById = async (id='') => {
    const exist = await Product.findById(id).where('status').equals(true);
    if (!exist) {
        throw new Error(`Product: ${id} not exist or had been removed in db`)
    }
}

module.exports = {
    isRoleValid,
    emailExist,
    userExistById,
    categorytExistById,
    categorytExistByName,
    productExist,
    productExistById
}