const { Post } = require('../../models/Post')
const { User } = require('../../models/User')
const { Category } = require('../../models/Category')




module.exports = {
    User: {
        posts: async (parent, args, context, info) => {
            try {
                const userId = parent._id
                const posts = await Post.find({ author: userId })

                return posts 

            } catch (err) {
                throw err
            }
        },
        categories: async (parent, args, context, info) => {
            try {
                const userId = parent._id
                const categories = await Category.find({ author: userId })

                return categories

            } catch (err) {
                throw err
            }
        }
    }
}