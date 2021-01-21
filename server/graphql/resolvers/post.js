const { Post } = require('../../models/Post')
const { User } = require('../../models/User')
const { Category } = require('../../models/Category')


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
        }
    }
}