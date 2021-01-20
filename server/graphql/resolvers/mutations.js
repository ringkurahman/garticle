const { User } = require('../../models/User')
const { UserInputError, AuthenticationError, ApolloError } = require('apollo-server-express')


module.exports = {
    Mutation:{
        authUser: async(parent, args, context, info)=>{
            try {
                // Check email
                const user = await User.findOne({
                    'email': args.fields.email
                })

                if (!user) {
                    throw new AuthenticationError('Please provide valid email')
                }
                // Check password
                const checkPass = await user.matchPassword(args.fields.password)

                if (!checkPass) {
                    throw new AuthenticationError('Please provide valid password')
                }
       
                // Get token from User model
                const getToken = await user.getSignedJwtToken()

                if (!getToken) {
                    throw new AuthenticationError('Something went wrong, please try again')
                }

                return { _id, firstname, lastname, email, role, token } = user

            } catch(err){
                throw err
            }
        },
        signup: async(parent, args, context, info)=>{
            try {
                const user = new User({
                    firstname: args.fields.firstname,
                    lastname: args.fields.lastname,
                    email: args.fields.email,
                    password: args.fields.password
                })
                // Get token from User model
                const getToken = await user.getSignedJwtToken()

                if (!getToken) {
                    throw new AuthenticationError('Something went wrong, please try again')
                }

                return { ...getToken._doc }

            } catch (err) {

                // Mongoose duplicate key
                if (err.code === 11000) {
                    throw new AuthenticationError('Duplicate field value entered')
                }
                // Mongoose bad ObjectId
                if (err.name === 'CastError') {
                    throw new AuthenticationError(`Resource not found`)
                }
                // Mongoose validation error
                if (err.name === 'ValidationError') {
                    const message = Object.values(err.errors).map(val => val.message)
                    throw new AuthenticationError(message)
                }

                throw err
            }
        }
    }
}