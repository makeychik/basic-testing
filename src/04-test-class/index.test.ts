import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

const testBalance = 42;
const testDepositAmount = 37;
const invalidWithdrawAmount = testBalance + 1;

describe('BankAccount', () => {
  let testBankAccount: BankAccount;
  let testRecipientBankAccount: BankAccount;

  beforeAll(() => {
    testBankAccount = getBankAccount(testBalance);
    testRecipientBankAccount = getBankAccount(testBalance);
  });

  test('should create account with initial balance', () => {
    expect(testBankAccount).toBeInstanceOf(BankAccount);
    expect(testBankAccount.getBalance()).toEqual(testBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => testBankAccount.withdraw(invalidWithdrawAmount)).toThrow(
      InsufficientFundsError,
    );
    expect(() => testBankAccount.withdraw(invalidWithdrawAmount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${testBalance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      testBankAccount.transfer(invalidWithdrawAmount, testRecipientBankAccount),
    ).toThrow(InsufficientFundsError);
    expect(() =>
      testBankAccount.transfer(invalidWithdrawAmount, testRecipientBankAccount),
    ).toThrow(`Insufficient funds: cannot withdraw more than ${testBalance}`);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      testBankAccount.transfer(testBalance, testBankAccount),
    ).toThrow(TransferFailedError);
    expect(() =>
      testBankAccount.transfer(testBalance, testBankAccount),
    ).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const currentBalance = testBankAccount.getBalance();
    testBankAccount.deposit(testDepositAmount);
    expect(testBankAccount.getBalance()).toEqual(
      currentBalance + testDepositAmount,
    );
  });

  test('should withdraw money', () => {
    const currentBalance = testBankAccount.getBalance();
    testBankAccount.withdraw(currentBalance);
    expect(testBankAccount.getBalance()).toEqual(0);
  });

  test('should transfer money', () => {
    testBankAccount.deposit(testDepositAmount);
    const currentBalance = testBankAccount.getBalance();
    const currentRecipientBalance = testRecipientBankAccount.getBalance();
    testBankAccount.transfer(currentBalance, testRecipientBankAccount);

    expect(testBankAccount.getBalance()).toEqual(0);
    expect(testRecipientBankAccount.getBalance()).toEqual(
      currentRecipientBalance + currentBalance,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await testBankAccount.fetchBalance();
    if (balance !== null) {
      expect(balance).toEqual(expect.any(Number));
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = await testBankAccount.fetchBalance();
    if (balance === null) {
      expect(balance).toBeNull();
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await testBankAccount.fetchBalance();
    } catch (error) {
      expect(error).toThrow(SynchronizationFailedError);
      expect(error).toThrow('Synchronization failed');
    }
  });
});
