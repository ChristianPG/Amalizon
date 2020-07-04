const { ApolloError } = require('apollo-server-express');

function TransactionError(message, scope, cause) {
  return new ApolloError(message, 'TRANSACTION', {
    data: { scope, cause },
  });
}

module.exports = TransactionError;
