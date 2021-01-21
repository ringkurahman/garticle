const { AuthenticationError } = require('apollo-server-express')
const { User } = require('../../models/User')
const { Category } = require('../../models/Category')
const { Post } = require('../../models/Post')
const authorize = require('../../middleware/isAuth')
const { sortArgsHelper } = require('../../middleware/userOwnerShip')




module.exports = {
    Query:{
         user: async(parent, args, context, info)=>{
            try{
                const req = authorize(context.req)
                const reqId = req._id.toString()

                const user = await User.findOne({ '_id':args.id })
                const userId = user._id.toString()

                if(reqId !== userId){
                    throw new AuthenticationError("You don't own this user")
                }
                return user

            }catch(err){
                throw err
            }
        },
        isAuth: async(parent, args, context, info)=>{ 
            try{
                const req = authorize(context.req, true)

                if(!req._id){
                    throw new AuthenticationError('Bad token')
                }
                return { _id, firstname, lastname, email, role, token } = req
                
            }catch(err){
                throw err
            }
        },
        categories: async (parent,{ id }, context, info) => {
            try {
                let catQuery = {}

                if (id) {
                    catQuery['_id'] = id
                }

                const categories = await Category.find(catQuery)
                return categories

            } catch (err) {
                throw err
            }
        },
        post: async (parent, args, context, info) => {
            try {
                const post = await Post.findOne({ _id: args.id })
                return post

            } catch (err) {
                throw err
            }
        },
        posts: async (parent, { sort, queryBy }, context, info) => {
            try {
                let queryByArgs = {}
                let sortArgs = sortArgsHelper(sort)

                if (queryBy) {
                    queryByArgs[queryBy.key] = queryBy.value
                }

                const posts = await Post.find(queryByArgs)
                    .sort([[sortArgs.sortBy, sortArgs.order]])
                    .skip(sortArgs.skip)
                    .limit(sortArgs.limit)

                return posts

            } catch (err) {
                throw err
            }
        }
    }
}