const { Post } = require('../../models/Post')
const { User } = require('../../models/User')


module.exports = {
    Category: {
        author: async(parent, args, context, info)=>{
            try{
                const authorId = parent.author
                const user = await User.findOne({ _id: authorId })

                return { ...user._doc, password:null } 
                
            } catch(err){
                throw err
            }
        },
        posts: async(parent, args, context, info)=>{
            try{
                const categoryID = parent._id
                const posts = await Post.find({ category: categoryID })

                return posts
                
            } catch(err){
                throw err
            }
        }
    }
}