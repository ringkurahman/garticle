const { Post } = require('../../models/Post')
const { User } = require('../../models/User')
const { Category } = require('../../models/Category')
const { sortArgsHelper } = require('../../middleware/userOwnerShip')


module.exports = {
    Post:{
        author: async(parent, args, context, info)=>{
            try{
                const userId = parent.author
                const user = await User.findOne({ _id:userId })

                return { ...user._doc, password: null } 
                
            } catch(err){
                throw err
            }
        },
        category: async(parent, args, context, info)=>{
            try{
                const categoryID = parent.category
                const category = await Category.findById({ _id: categoryID })

                return { ...category._doc }
                
            } catch(err){
                throw err
            }
        },
        related: async (parent,{ sort }, context, info) => {
            try {
                let sortArgs = sortArgsHelper(sort)

                const posts = await Post.find({ category: parent.category })
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