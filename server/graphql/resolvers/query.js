const { AuthenticationError } = require('apollo-server-express')
const { User } = require('../../models/User')
const { Category } = require('../../models/Category')
const authorize = require('../../middleware/isAuth')




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
        categories: async (parent,{ catId }, context, info) => {
            try {
                let catQuery = {}

                if (catId) {
                    catQuery['_id'] = catId
                }

                const categories = await Category.find(catQuery)
                return categories

            } catch (err) {
                throw err
            }
        }
    }
}