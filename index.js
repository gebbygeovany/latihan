const { ApolloServer, PubSub} = require('apollo-server')
const mongoose = require('mongoose')

const { MONGODB } = require('./config')
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')

const pubsub = new PubSub()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({ req,pubsub })
});

mongoose.connect(MONGODB, { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected')
        return server.listen()
    }).then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`)
    });
