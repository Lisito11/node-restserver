
const {Schema, model} = require('mongoose');

const categorySchema = Schema({
    name:{
        type:String,
        required: [true, 'Name is required'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

categorySchema.methods.toJSON = function () {
    const {__v, status, ...data} = this.toObject();
    return data;
}

const Category = model('Category', categorySchema)

module.exports = Category;