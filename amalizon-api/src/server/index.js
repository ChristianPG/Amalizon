const express = require("express");
const graphql = require("./../graphql");

module.exports = {
  init: () => {
    // create server
    const app = express();

    // apply graphql middleware
    graphql.applyMiddleware({ app });

    // init server
    app.listen({ port: process.env.PORT || 4000 }, () => {
      console.log(
        `Server started! 🚀 => http://localhost:${process.env.PORT || 4000}`
      );
    });
  }
};
