jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: (fn: (...args: unknown[]) => unknown) => fn,
}));

import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const mockCreate = jest.fn();
  const mockGet = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (axios.create as jest.Mock).mockImplementation((config) => {
      mockCreate(config);
      return { get: mockGet };
    });
  });

  test('should create instance with provided base url', async () => {
    mockGet.mockResolvedValue({ data: { ok: true } });

    await throttledGetDataFromApi('/posts');

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    mockGet.mockResolvedValue({ data: { id: 1 } });

    await throttledGetDataFromApi('/users');

    expect(mockGet).toHaveBeenCalledWith('/users');
  });

  test('should return response data', async () => {
    const mockResponse = { data: { name: 'John' } };
    mockGet.mockResolvedValue(mockResponse);

    const result = await throttledGetDataFromApi('/test');

    expect(result).toEqual(mockResponse.data);
  });
});
