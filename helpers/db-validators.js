const Role = require('../models/role');
const User = require('../models/user');

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


module.exports = {
    isRoleValid,
    emailExist,
    userExistById
}