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

const login = async (
  loginRequest: LoginRequest,
): Promise<LoginResponse> => {
  const result = await httpClient.post<LoginResponse>('/identity/login', loginRequest);
  tokenService.storeToken(result.accessToken, result.refreshToken);
  return result;
};

export default login;
