const express = require('express')
require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')


// Connect Database
connectDB()


/// graphql 
const typeDefs = require('./graphql/schema')
const { Query } = require('./graphql/resolvers/query')
const { Mutation } = require('./graphql/resolvers/mutations')
const { User } = require('./graphql/resolvers/user')
const { Post } = require('./graphql/resolvers/post')
const { Category } = require('./graphql/resolvers/category')


const app = express()

// Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

const server = new ApolloServer({
    typeDefs,
    resolvers:{
        Query,
        Mutation,
        User,
        Post,
        Category
    },
    context:({ req })=>{
        
        req.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA5ZDNiZjY0YTY5YzMwOThiYjNlMjYiLCJlbWFpbCI6InJpbmdrdTEwMTIxQGdtYWlsLmNvbSIsImlhdCI6MTYxMTI1Njc4NywiZXhwIjoxNjExODYxNTg3fQ.YJql6FgIPLZ22tAkdINX8cCS04YVEn-j109Lik73Jso'

        return {req}
    }
})

server.applyMiddleware({ app })


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`)
})