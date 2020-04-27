import httpClient from '@/services/httpClient/httpClient';
import api from '..';
import { LoginRequest, LoginResponse } from '../login';

describe('login', () => {
  const request: LoginRequest = {
    email: 'test@gmail.com',
    password: 'password123!',
  };

  it('returns LoginResponse when request succeeded', async () => {
    const expected: LoginResponse = {
      accessToken: 'token',
      refreshToken: 'refreshToken',
    };
    jest.spyOn(httpClient, 'post').mockReturnValue(Promise.resolve(expected));

    const response = await api.login(request);

    expect(response).toEqual(expected);
  });

  it('throws if api throws', async () => {
    jest.spyOn(httpClient, 'post').mockImplementation(() => { throw new Error('error'); });

    await expect(api.login(request)).rejects.toThrowError('error');
  });
});
