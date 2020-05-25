import httpClient from '@/services/httpClient/httpClient';
import tokenService from '@/services/tokenService/tokenService';
import { when } from 'jest-when';
import api from '..';
import { RegisterRequest, LoginResponse } from '../loginOrRegister';

describe('register', () => {
  const registerRequest: RegisterRequest = {
    email: 'test@gmail.com',
    password: 'password123!',
    firstname: 'Firstname',
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
      when(jest.spyOn(httpClient, 'post'))
        .mockRejectedValue(new Error('failed'))
        .calledWith('/identity/register', registerRequest)
        .mockResolvedValue(expected);
    });

    it('returns LoginResponse when register succeeded', async () => {
      const response = await api.register(registerRequest);

      expect(response).toEqual(expected);
    });

    it('stores token', async () => {
      await api.register(registerRequest);

      expect(tokenService.storeToken).toBeCalledWith(
        expected.accessToken,
        expected.refreshToken,
      );
    });
  });

  describe('fails', () => {
    beforeEach(() => {
      when(jest.spyOn(httpClient, 'post'))
        .calledWith('/identity/register', registerRequest)
        .mockImplementation(() => {
          throw new Error('error');
        });
    });

    it('throws if api throws', async () => {
      await expect(api.register(registerRequest)).rejects.toThrowError(
        'error',
      );

      expect(tokenService.storeToken).not.toBeCalled();
    });
  });
});
