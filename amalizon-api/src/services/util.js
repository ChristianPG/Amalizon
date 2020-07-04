const graphqlFields = require('graphql-fields');

module.exports = {
  getRequestedFields: info => {
    return graphqlFields(info);
  },

  configureEnvVars: () => {
    if (process.env.NODE_ENV !== 'production') {
      require('dotenv').config(); // eslint-disable-line
    }
  },

  isDevEnv: () => {
    return process.env.NODE_ENV === 'development';
  },

  createArray: length => Array.from(Array(length).keys()).map(value => value + 1),
};
