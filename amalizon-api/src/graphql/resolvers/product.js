module.exports = {
  queries: {
    products(parent, args, context, info) {
      return context.db.query.products({}, info);
    },

    productById(parent, args, context, info) {
      return context.db.query.product(
        {
          where: { id: args.id }
        },
        info
      );
    }
  },

  mutations: {
    createProduct: async (parent, args, context, info) => {
      const { input } = args;

      console.log(input.categories);


      return context.db.mutation.createProduct(
        {
          data: {
            name: input.name,
            description: input.description,
            picture: input.picture,
            price: input.price,
            categories: {
              connect: input.categories
            }
          }
        },
        info
      );
    }
  }
};
