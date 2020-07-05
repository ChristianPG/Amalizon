const { gql } = require("apollo-server-express");

module.exports = {
  type: gql`
    type Product {
      id: ID!
      name: String!
      description: String!
      picture: String!
      price: Float!
      categories: [Category!]!
    }

    input createProductInput {
      name: String!
      description: String!
      picture: String!
      price: Float!
      categories: [connectCategoryInput!]!
    }

    input searchProductsInput {
      pageSize: Int!
      page: Int!
      keyword: String!
      categoryId: ID!
    }

    input connectCategoryInput {
      id: ID!
    }
  `,

  queries: `
    products: [Product]!
    searchProducts(input: searchProductsInput!): [Product]!
    productById(id: ID!): Product
  `,

  mutations: `
    createProduct(input: createProductInput!): Product!
  `
};
