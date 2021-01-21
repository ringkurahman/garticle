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

const app = express()

// Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

const server = new ApolloServer({
    typeDefs,
    resolvers:{
        Query,
        Mutation
    },
    context:({ req })=>{
        
        req.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMDhkNDBiM2JiNDdjMjJlMDM5MTI0OSIsImlhdCI6MTYxMTE5MTg0NiwiZXhwIjoxNjExNzk2NjQ2fQ.suoAX8JVtjCXQysND9qfXEW4A7AMCB_71310la3N3lc'

        return {req}
    }
})

server.applyMiddleware({ app })


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`)
})