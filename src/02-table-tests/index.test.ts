import { simpleCalculator, Action } from './index';

const INVALID_VALUE = 'invalid';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 3, b: 4, action: Action.Exponentiate, expected: 81 },
  { a: 3, b: 4, action: INVALID_VALUE, expected: null },
  { a: INVALID_VALUE, b: INVALID_VALUE, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('test', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
  test('should blah-blah', () => {
    expect(true).toBe(true);
  });
});
