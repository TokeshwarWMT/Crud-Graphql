const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Post {
    id: ID
    name: String
    email: String
    password: String

}

type Query {
    hello: String
    getAllPosts: [Post]
    getPost(id: ID): Post
}

input PostInput {
    name: String,
    email: String,
    password: String
}

type Mutation {
    createPost(post: PostInput): Post
    updatePost(id: ID, post: PostInput): Post
    deletePost(id: ID ): Post
}
`
module.exports = typeDefs;
