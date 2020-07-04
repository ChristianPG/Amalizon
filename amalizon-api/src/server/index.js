const express = require('express');
const graphql = require('./../graphql');

module.exports = {
  init: () => {
    // create server
    const app = express();

    // apply graphql middleware
    graphql.applyMiddleware({ app });

    // init server
    app.listen({ port: 4000 }, () => {
      console.log(`Server started! 🚀 => http://localhost:4000`);
    });
  },
};
