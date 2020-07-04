const { gql } = require('apollo-server-express');

module.exports = {
  type: gql`
    type Category {
      id: ID!
      name: String!,
    }

    input createCategoryInput {
      name: String!,
    }
  `,

  queries: `
    categories: [Category]!
    categoryById(id: String!): Category
  `,

  mutations: `
    createCategory(input: createCategoryInput!): Category!
  `,
};
