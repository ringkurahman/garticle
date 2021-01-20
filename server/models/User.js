const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()



const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please add a name'],
        maxlength: 50
    },
    lastname: {
        type: String,
        required: [true, 'Please add a name'],
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid Email']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 5
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    token: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
    let user = this
    if (!user.isModified('password')) {
        next()
    }
    
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
})


// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    
    let user = this
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })

    user.token = token
    return user.save()   
}


// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    let user = this
    return await bcrypt.compare(enteredPassword, user.password)
        .then(function (result) {
            return result
    })
}



const User = mongoose.model('User', UserSchema)
module.exports = { User }