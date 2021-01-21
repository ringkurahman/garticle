const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SALT_I = 10



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
UserSchema.pre('save', function(next){
    let user = this

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I, function(err, salt){
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else{
        next()
    }
})


// Sign JWT and save user into database
UserSchema.methods.getSignedJwtToken = async function(){
    let user = this

    let token = jwt.sign({ _id:user._id, email:user.email }, process.env.JWT_SECRET,{
        expiresIn:'7d'
    })

    user.token = token
    return user.save()
}


// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = function(candidatePassword){
    var user = this
    return bcrypt.compare(candidatePassword, user.password)
        .then(function (result) {
        return result
    })
}



const User = mongoose.model('User', UserSchema)
module.exports = { User }