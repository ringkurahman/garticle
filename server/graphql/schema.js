const { gql } = require('apollo-server-express')


const typeDefs = gql`
    type Query{
        user(id:ID!):User!
        isAuth:User!
    }

    type Mutation {
        updateUserEmailPass(_id:ID!, email: String!, password: String): User!
        updateUserProfile(_id:ID!, fields:ProfileInput): User!
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

    input ProfileInput {
        firstname:String, 
        lastname:String,
        role: String
    }

    input AuthInput {
        firstname: String
        lastname: String
        email: String!
        password: String
    }
`

module.exports = typeDefs