import 'babel-polyfill';

const { depositMoney, withdrawMoney } = require('../../src/services/user');

const expectedUser = {
  bankId: 'cspg',
  balance: 100,
}

const mockedContext = {
  db: {
    query: {
      user: (payload) => {
        if (payload.where.bankId === expectedUser.bankId) {
          return expectedUser;
        }
        return null;
      }
    },
    mutation: {
      updateUser: (payload) => {
        return { ...expectedUser, balance: payload.data.balance };
      }
    }
  }
}

describe('User Service', () => {
  it('Should add money to the user\'s balance', async () => {
    const amountToAdd = 12;
    const updatedInformation = await depositMoney(expectedUser.bankId, amountToAdd, mockedContext, {})

    expect(updatedInformation.balance).toEqual(expectedUser.balance + amountToAdd);
  });

  it('Should throw error depositing negative amount', async () => {
    try {
      await depositMoney(expectedUser.bankId, -12, mockedContext, {})

      fail('The method didn\'t fail');
    } catch (err) {
      expect(err.data.cause).toEqual('Cannot deposit/withdraw negative amounts of money');
    }
  });

  it('Should throw error depositing when the user doesn\'t exist', async () => {
    try {
      await depositMoney('asdf', 12, mockedContext, {})

      throw new Error('The method didn\'t fail')
    } catch (err) {
      expect(err.data.cause).toEqual('The bank id provided is not linked to any user');
    }
  });

  it('Should withdraw money to the user\'s balance', async () => {
    const amountToWithdraw = 12;
    const updatedInformation = await withdrawMoney(expectedUser.bankId, amountToWithdraw, mockedContext, {})

    expect(updatedInformation.balance).toEqual(expectedUser.balance - amountToWithdraw);
  });

  it('Should throw error depositing negative amount', async () => {
    try {
      await withdrawMoney(expectedUser.bankId, -12, mockedContext, {})

      fail('The method didn\'t fail');
    } catch (err) {
      expect(err.data.cause).toEqual('Cannot deposit/withdraw negative amounts of money');
    }
  });

  it('Should throw error withdrawing when the amount is bigger than balance', async () => {
    try {
      await withdrawMoney(expectedUser.bankId, 120, mockedContext, {})

      throw new Error('The method didn\'t fail')
    } catch (err) {
      expect(err.data.cause).toEqual('The amount is bigger than the balance');
    }
  });

  it('Should throw error withdrawing when the user doesn\'t exist', async () => {
    try {
      await depositMoney('asdf', 12, mockedContext, {})

      throw new Error('The method didn\'t fail')
    } catch (err) {
      expect(err.data.cause).toEqual('The bank id provided is not linked to any user');
    }
  });
});
