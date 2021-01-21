const { gql } = require('apollo-server-express')


const typeDefs = gql`
    type Query{
        user(id:ID!):User!
        isAuth:User!
        post(id:ID): Post!
        posts(sort:SortInput, queryBy:QueryByInput): [Post]!
        categories(id:ID): [Category]!
    }

    type Mutation {
        updateUserEmailPass(_id:ID!, email: String!, password: String): User!
        updateUserProfile(_id:ID!, fields:ProfileInput): User!
        authUser(fields:AuthInput!): User!
        signup(fields:AuthInput!): User!
        createPost(fields:PostInput!): Post!
        createCategory(name:String!): Category!
    }

    type Post {
        _id:ID!
        title: String!
        excerpt: String!
        content: String!
        status: PostStatus
        created_at: String
        updated_at: String
        author: User!
        category: Category!
        related(sort:SortInput): [Post!]
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
        posts(sort:SortInput): [Post!]!
        categories: [Category!]!
    }

    type Category { 
        _id: ID!
        name: String!
        author: User!
        posts: [Post]
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
        category: ID
    }

    input SortInput {
        sortBy: String
        order: String
        limit: Int
        skip: Int
    }

    input QueryByInput {
        key: String!
        value: String!
    }

    enum PostStatus {
        PUBLIC,
        DRAFT
    }
`

module.exports = typeDefs