const { gql } = require('apollo-server-express')


const typeDefs = gql`
    type Query{
        hello:String
    }

    type Mutation {
        authUser(fields:AuthInput!): User!
        signup(fields:AuthInput!): User!
    }

    type User {
        _id: ID!
        firstname: String
        lastname: String
        email: String!
        password: String
        role: String
        token: String
        createdAt: String
    }

    input AuthInput {
        firstname: String
        lastname: String
        email: String!
        password: String
    }
`

module.exports = typeDefs