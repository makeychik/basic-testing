import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const testValue = 42;
const testMessage = 'Error test message';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const resolvedTestValue = await resolveValue(testValue);
    expect(resolvedTestValue).toBe(testValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    try {
      throwError(testMessage);
    } catch (error: unknown) {
      expect((error as Error).message).toMatch(testMessage);
    }
  });

  test('should throw error with default message if message is not provided', () => {
    try {
      throwError();
    } catch (error: unknown) {
      expect((error as Error).message).toBe('Oops!');
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
    expect(() => throwCustomError()).toThrow(
      'This is my awesome custom error!',
    );
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
    await expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });
});
