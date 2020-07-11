module.exports = {
  queries: {
    products(parent, args, context, info) {
      return context.db.query.products({}, info);
    },

    async numberOfPagesByCondition(parent, args, context) {
      const { input } = args;
      let condition = {
        name_contains: input.keyword
      };

      if (input.categoryId !== "all") {
        condition = {
          ...condition,
          categories_some: {
            id: input.categoryId
          }
        };
      }

      const productCount = (
        await context.db.query.productsConnection(
          {
            where: condition
          },
          `{
          aggregate { count }
        }`
        )
      ).aggregate.count;

      return Math.ceil(productCount / input.pageSize);
    },

    async searchProducts(parent, args, context, info) {
      const { input } = args;
      let condition = {
        name_contains: input.keyword
      };

      if (input.categoryId !== "all") {
        condition = {
          ...condition,
          categories_some: {
            id: input.categoryId
          }
        };
      }

      return context.db.query.products(
        {
          first: input.pageSize,
          skip: (input.page - 1) * input.pageSize,
          where: condition
        },
        info
      );
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
    },
    updatePicture: async (parent, args, context, info) => {
      const { input } = args;

      return context.db.mutation.updateProduct(
        {
          where: {
            id: input.id,
          },
          data: {
            picture: input.url,
          },
        },
        info
      );
    }
  }
};
