const { UserInputError, AuthenticationError, ApolloError } = require('apollo-server-express')
const { User } = require('../../models/User')
const { Post } = require('../../models/Post')
const { Category } = require('../../models/Category')
const authorize = require('../../middleware/isAuth')
const  { userOwnership } = require('../../middleware/userOwnerShip')



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
        },
        updateUserProfile: async (parent, args, context, info) => {
            try {
                const req = authorize(context.req)

                if (!userOwnership(req, args._id)) {
                    throw new AuthenticationError("You don't own this user")
                }

                const user = await User.findOneAndUpdate({_id:args._id}, { "$set":{
                            firstname: args.fields.firstname,
                            lastname: args.fields.lastname,
                            role: args.fields.role
                        }
                    }, {
                        new: true,
                        runValidators: true
                    }
                )

                return {...user._doc}

            } catch (err) {
                throw err
            }
        },
        updateUserEmailPass: async (parent, args, context, info) => {
            try {
                const req = authorize(context.req)

                if(!userOwnership(req, args._id))
                throw new AuthenticationError("You don't own this user")

                const user =await User.findOne({ _id:req._id })
                if(!user) throw new AuthenticationError("Sorry, try again")

                // Validate fields
                if(args.email){ user.email = args.email }
                if(args.password){ user.password = args.password }

                // USER IS RIGHT, GENERATE TOKEN
                const getToken = await user.getSignedJwtToken()
                if(!getToken) { 
                    throw new AuthenticationError('Something went wrong, try again')
                }

                return { ...getToken._doc, token:getToken.token}

            } catch (err) {
                throw new AuthenticationError('Something went wrong1, please try again', err)
            }
        },
        createPost: async(parent, { fields }, context, info)=> {
            try {
                const req = authorize(context.req)
                /// validate...
                const post = new Post({
                    title: fields.title,
                    excerpt:fields.excerpt,
                    content:fields.content,
                    author: req._id,
                    status: fields.status,
                    category: fields.category
                })

                const result = await post.save()

                return { ...result._doc }

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
        },
        updatePost: async (parent, { _id, fields}, context, info) => {
            try {
                const req = authorize(context.req)

                const post = await Post.findOne({ _id: _id })
                // Throw 

                if (!userOwnership(req, post.author)) {
                    throw new AuthenticationError("Not authorized to update")
                }

                // if (post.title != fields.title) {
                //     post.title = fields.title
                // }

                for (key in fields) {
                    if (post[key] != fields[key]) {
                        post[key] = fields[key]
                    }
                }

                const result = await post.save()

                return { ...result._doc }

            } catch (err) {
                throw err
            }
        },
        deletePost: async (parent, { _id }, context, info) => {
            try {
                const req = authorize(context.req)

                const post = await Post.findByIdAndRemove(_id)

                if (!post) {
                    throw new AuthenticationError("Sorry, not able to find your post")
                }

                return post

            } catch (err) {
                throw err
            }
        },
        createCategory: async(parent, args, context, info)=> {
            try {
                const req = authorize(context.req)
                // validate
                const category = new Category({
                    author: req._id,
                    name: args.name
                })

                const result = await category.save()

                return { ...result._doc }
                
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
        },
        updateCategory: async (parent,{ _id, name }, context, info) => {
            try {
                const req = authorize(context.req)

                const category = await Category.findOneAndUpdate(
                    { _id: _id },
                    {
                        "$set":{
                            name
                        }
                    },
                    { new: true}
                )

                return { ...category._doc }

            } catch (err) {
                throw err
            }
        },
        deleteCategory: async(parent,{ _id },context,info)=> { 
            try {
                const req = authorize(context.req)

                const category = await Category.findByIdAndRemove(_id)

                if (!category) {
                    throw new UserInputError('Sorry, not able to find your category or it was deleted already')
                }
               
                return category

            } catch( err ) {
                throw err
            }
        }
    }
}