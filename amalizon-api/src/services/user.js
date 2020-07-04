const { TransactionError, UserError } = require('./../errors');

const getUserByBankId = async (bankId, scope, context, info) => {
  const user = await context.db.query.user(
    {
      where: {
        bankId,
      },
    },
    info
  );

  if (!user) {
    throw new UserError(
      'Invalid bank id',
      scope,
      'The bank id provided is not linked to any user',
    )
  }

  return user;
}

const validateAmount = (amount, scope) => {
  if (amount < 0) {
    throw new TransactionError(
      'Invalid amount',
      scope,
      'Cannot deposit/withdraw negative amounts of money',
    )
  }
}

const depositMoney = async (bankId, amount, context, info) => {
  const scope = 'DEPOSIT_MONEY'
  validateAmount(amount, scope);

  const user = await getUserByBankId(bankId, scope, context, info);

  const newBalance = user.balance + amount;

  return context.db.mutation.updateUser(
    {
      where: {
        id: user.id,
      },
      data: {
        balance: newBalance,
      },
    },
    info
  );
};

const withdrawMoney = async (bankId, amount, context, info) => {
  const scope = 'WITHDRAW_MONEY'
  validateAmount(amount, scope);

  const user = await getUserByBankId(bankId, scope, context, info);

  if (amount > user.balance) {
    throw new TransactionError(
      'Invalid amount',
      scope,
      'The amount is bigger than the balance',
    )
  }

  const newBalance = user.balance - amount;

  return context.db.mutation.updateUser(
    {
      where: {
        id: user.id,
      },
      data: {
        balance: newBalance,
      },
    },
    info
  );
};

module.exports = {depositMoney, withdrawMoney};
