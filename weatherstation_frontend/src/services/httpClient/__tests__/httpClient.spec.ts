import tokenService from '@/services/tokenService/tokenService';
import router from '@/router';
import { when } from 'jest-when';
import httpClient, { baseUrl } from '../httpClient';

let accessTokenLocal = (): string | null => 'token';
let refreshTokenLocal = (): string | null => 'refreshToken';

const storeTokenMock = (accessToken: string, refreshToken: string) => {
  accessTokenLocal = () => accessToken;
  refreshTokenLocal = () => refreshToken;
};

describe('httpClient', () => {
  let fakeFetch: any;
  let fakeFetchMock: jest.Mock<any, any>;

  beforeEach(() => {
    jest
      .spyOn(tokenService, 'getAccessToken')
      .mockImplementation(() => accessTokenLocal());
    jest
      .spyOn(tokenService, 'getRefreshToken')
      .mockImplementation(() => refreshTokenLocal());
    jest
      .spyOn(tokenService, 'storeToken')
      .mockImplementation((x, y) => storeTokenMock(x, y));
    jest.spyOn(tokenService, 'clearToken').mockImplementation(() => {});
    jest.spyOn(tokenService, 'isExpired').mockReturnValue(false);
    jest.spyOn(router, 'push').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  const fetchMockSuccess = (
    responseAsJson: Record<string, any> = { success: true },
  ): void => {
    const response = {
      ok: true,
      json: () => Promise.resolve(responseAsJson),
    } as Response;
    fakeFetchMock = jest.fn();
    fakeFetch = fakeFetchMock.mockReturnValue(Promise.resolve(response));
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

  describe('post', () => {
    test('calls fetch with correct parameters and returns response', async () => {
      fetchMockSuccess();
      const payload = {
        myPayload: true,
      };

      const result = await httpClient.post('my-url', payload, false);

      expect(fakeFetch).toBeCalledWith(`${baseUrl}my-url`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      expect(result).toEqual({ success: true });
    });

    test('throws error when statusCode is not 200', async () => {
      fetchMockFail();

      await expect(httpClient.post('my-url', {})).rejects.toThrowError(
        'error',
      );
    });
  });

  describe('sendRequest', () => {
    it('adds token to request', async () => {
      jest.spyOn(tokenService, 'isExpired').mockReturnValue(false);
      fetchMockSuccess();

      const result = await httpClient.get('/test');

      expect(fakeFetch).toBeCalledWith(`${baseUrl}/test`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer token',
        },
      });
      expect(result).toEqual({ success: true });
    });

    it('refreshes token if necessary before request', async () => {
      jest.spyOn(tokenService, 'isExpired').mockReturnValue(true);
      fetchMockSuccess({
        accessToken: 'newToken',
        refreshToken: 'newRefreshToken',
      });

      const result = await httpClient.get('/test');

      expect(fakeFetchMock.mock.calls[0]).toEqual([
        `${baseUrl}/identity/refresh`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accessToken: 'token',
            refreshToken: 'refreshToken',
          }),
        },
      ]);
      expect(tokenService.storeToken).toBeCalledWith(
        'newToken',
        'newRefreshToken',
      );
      expect(fakeFetchMock.mock.calls[1]).toEqual([
        `${baseUrl}/test`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer newToken',
          },
        },
      ]);
    });

    it('clears tokens and redirects to login page if sendAuth is true but no token is present', async () => {
      jest.spyOn(tokenService, 'isExpired').mockReturnValue(false);
      accessTokenLocal = () => null;
      fetchMockSuccess();

      await httpClient.get('/test');

      expect(tokenService.clearToken).toBeCalled();
      expect(router.push).toBeCalledWith('/login');
    });

    it('clears tokens and redirects to login page if token is expired and refresh fails', async () => {
      jest.spyOn(tokenService, 'isExpired').mockReturnValue(true);
      accessTokenLocal = () => 'token';
      refreshTokenLocal = () => 'refreshToken';
      const failResponse = {
        status: 400,
        statusText: 'error',
        ok: false,
        json: () => Promise.resolve({}),
      } as Response;
      const successResponse = {
        status: 200,
        ok: true,
        json: () => Promise.resolve({}),
      } as Response;

      fakeFetch = fakeFetchMock.mockReturnValueOnce(
        Promise.resolve(failResponse),
      ).mockReturnValueOnce(Promise.resolve(successResponse));

      await httpClient.get('/test');

      expect(tokenService.clearToken).toBeCalled();
      expect(router.push).toBeCalledWith('/login');
    });
  });
});
