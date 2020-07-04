const category = require('./category');
const product = require('./product');

module.exports = {
  queries: {
    ...category.queries,
    ...product.queries,
  },
  mutations: {
    ...category.mutations,
    ...product.mutations,
  },
};
