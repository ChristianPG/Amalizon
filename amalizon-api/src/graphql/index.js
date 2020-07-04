const { ApolloServer } = require('apollo-server-express');

// schemes
const typeDefs = require('./schemes');

// resolvers
const resolvers = require('./resolvers');

// DB
const db = require('./../prisma/db');

// create graphql server
const server = new ApolloServer({
  typeDefs: [...typeDefs],
  context: req => ({ ...req, db }),
  formatError: err => {
    console.log(err);
    return err;
  },
  resolvers: {
    Query: {
      ...resolvers.queries,
    },
    Mutation: {
      ...resolvers.mutations,
    },
    ...resolvers.unions,
  },
  playground:
    process.env.NODE_ENV === 'production'
      ? false
      : {
          settings: {
            'editor.cursorShape': 'line',
          },
        },
});

module.exports = server;
