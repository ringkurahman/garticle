const mongoose = require('mongoose')
const Schema = mongoose.Schema



const CategorySchema = mongoose.Schema({
    name:{
        required: true,
        type:String,
        trim: true,
        unique: true,
        lowercase:true,
        maxlength: 250
    },
    author:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = { Category }