import httpClient from '@/services/httpClient/httpClient';
import tokenService from '@/services/tokenService/tokenService';
import api from '..';
import { LoginRequest, LoginResponse } from '../login';

describe('login', () => {
  const request: LoginRequest = {
    email: 'test@gmail.com',
    password: 'password123!',
  };

  beforeEach(() => {
    jest.spyOn(tokenService, 'storeToken').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('success', () => {
    const expected: LoginResponse = {
      accessToken: 'token',
      refreshToken: 'refreshToken',
    };

    beforeEach(() => {
      jest
        .spyOn(httpClient, 'post')
        .mockReturnValue(Promise.resolve(expected));
    });

    it('returns LoginResponse when request succeeded', async () => {
      const response = await api.login(request);

      expect(response).toEqual(expected);
    });

    it('stores token', async () => {
      await api.login(request);

      expect(tokenService.storeToken).toBeCalledWith(
        expected.accessToken,
        expected.refreshToken,
      );
    });
  });

  it('throws if api throws', async () => {
    jest.spyOn(httpClient, 'post').mockImplementation(() => {
      throw new Error('error');
    });

    await expect(api.login(request)).rejects.toThrowError('error');
    expect(tokenService.storeToken).not.toBeCalled();
  });
});
