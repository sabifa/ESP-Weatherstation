// eslint-disable-next-line import/no-cycle
import httpClient from '../httpClient/httpClient';
import tokenService from '../tokenService/tokenService';

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

const sendIdentityRequest = async (
  loginRequest: LoginRequest,
  login: boolean,
): Promise<LoginResponse> => {
  const url = login ? '/identity/login' : '/identity/register';
  const result = await httpClient.post<LoginResponse>(url, loginRequest, false);
  tokenService.storeToken(result.accessToken, result.refreshToken);
  return result;
};

export const login = async (
  loginRequest: LoginRequest,
): Promise<LoginResponse> => sendIdentityRequest(loginRequest, true);

export const register = async (
  registerRequest: LoginRequest,
): Promise<LoginResponse> => sendIdentityRequest(registerRequest, false);
