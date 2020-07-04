module.exports = {
  queries: {
    categories(parent, args, context, info) {
      return context.db.query.categories({}, info);
    },

    categoryById(parent, args, context, info) {
      return context.db.query.category(
        {
          where: { id: args.id },
        },
        info
      );
    },
  },

  mutations: {
    createCategory: async (parent, args, context, info) => {
      const { input } = args;

      return context.db.mutation.createCategory(
        {
          data: {
            name: input.name,
          },
        },
        info
      );
    },
  },
};
