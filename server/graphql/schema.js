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
        createPost(fields:PostInput!): Post!
    }

    type Post {
        _id:ID!
        title: String!
        excerpt: String!
        content: String!
        created_at: String
        updated_at: String
        author: User!
        status: PostStatus
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

    input PostInput {
        title: String
        excerpt: String
        content: String
        status: PostStatus
    }
    enum PostStatus {
        PUBLIC,
        DRAFT
    }
`

module.exports = typeDefs