const { gql } = require('apollo-server-express');

const category = require('./category');
const product = require('./product');

const rootQuery = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    ${category.queries}
    ${product.queries}
  }

  type Mutation {
    ${category.mutations}
    ${product.mutations}
  }
`;

module.exports = [
  rootQuery,
  category.type,
  product.type,
];
