const { ApolloError } = require('apollo-server-express');

function UserError(message, scope, cause) {
  return new ApolloError(message, 'USER', {
    data: { scope, cause },
  });
}

module.exports = UserError;
