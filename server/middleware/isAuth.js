const jwt = require('jsonwebtoken')
require('dotenv').config()
const { AuthenticationError } = require('apollo-server-express')




const throwAuthError = () => {
    throw new AuthenticationError('You are not auth')
}



const authorize = (req, verify = false) => {
    
    const authorizationHeader = req.headers.authorization || ''

    if(!authorizationHeader) {
        req.isAuth = false
        return !verify ? throwAuthError() : req
    }

    const token = authorizationHeader.replace('Bearer ','')
    if(!token || token === ''){
        req.isAuth = false
        return !verify ? throwAuthError() : req
    }

    let decodedJWT
    try {
        decodedJWT = jwt.verify(token, process.env.JWT_SECRET)
        if(!decodedJWT){
            req.isAuth = false
            return !verify ? throwAuthError() : req
        }

        req.isAuth = true
        req._id = decodedJWT._id
        req.firstname = decodedJWT.firstname
        req.lastname = decodedJWT.lastname
        req.email = decodedJWT.email
        req.role = decodedJWT.role
        req.token = token

        return req

    } catch(err){
        req.isAuth = false
        return !verify ? throwAuthError() : req
    }
}



module.exports = authorize