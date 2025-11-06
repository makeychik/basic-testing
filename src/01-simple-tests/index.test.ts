import { simpleCalculator, Action } from './index';

const INVALID_VALUE = 'invalid';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Subtract })).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Multiply })).toBe(8);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 9, b: 3, action: Action.Divide })).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 4, action: Action.Exponentiate })).toBe(
      81,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 3, b: 4, action: INVALID_VALUE })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({
        a: INVALID_VALUE,
        b: INVALID_VALUE,
        action: Action.Add,
      }),
    ).toBe(null);
  });
});
