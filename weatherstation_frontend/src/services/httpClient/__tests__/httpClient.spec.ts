import httpClient, { baseUrl } from '../httpClient';

describe('httpClient', () => {
  let fakeFetch: any;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('post', () => {
    const responseAsJson = { success: true };

    const fetchMockSuccess = (): void => {
      const response = {
        ok: true,
        json: () => Promise.resolve(responseAsJson),
      } as Response;
      fakeFetch = jest.fn().mockReturnValue(Promise.resolve(response));
      window.fetch = fakeFetch;
    };

    const fetchMockFail = (): void => {
      const response = {
        status: 400,
        statusText: 'error',
        ok: false,
        json: () => Promise.resolve({}),
      } as Response;
      fakeFetch = jest.fn().mockReturnValue(Promise.resolve(response));
      window.fetch = fakeFetch;
    };

    test('calls fetch with correct parameters and returns response', async () => {
      fetchMockSuccess();
      const payload = {
        myPayload: true,
      };

      const result = await httpClient.post('my-url', payload);

      expect(fakeFetch).toBeCalledWith(`${baseUrl}my-url`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      expect(result).toEqual(responseAsJson);
    });

    test('throws error when statusCode is not 200', async () => {
      fetchMockFail();

      await expect(httpClient.post('my-url', {})).rejects.toThrowError('error');
    });
  });
});
