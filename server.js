const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
mongoose.set('strictQuery', false);
async function startServer() {
    const app = express()
    const apolloserver = new ApolloServer({ typeDefs, resolvers });
    await apolloserver.start();
    apolloserver.applyMiddleware({ app: app })

    app.use((req, res) => {
        res.send('express apollo server is start!!')
    })

    await mongoose.connect('mongodb+srv://Satyaveer1994:Satyaveer123@cluster0.pn1nk.mongodb.net/Graphql')
        .then(() => console.log('MongoDB connection successfull'))
        .catch((e) => console.log(e));

    app.listen(3000, () => {
        console.log('Express server is running on port 3000')
    });
};

startServer();