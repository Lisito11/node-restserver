
const {Schema, model} = require('mongoose');

const roleSchema = Schema({
    role:{
        type:String,
        required: [true, 'Role is required']
    }
});



const Role = model('Role', roleSchema)

module.exports = Role;