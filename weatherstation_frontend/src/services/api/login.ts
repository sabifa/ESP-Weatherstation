import httpClient from '../httpClient/httpClient';

export type LoginRequest = {
  email: string;
  password: string;
}

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
}

const login = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
  const x = '';
  return httpClient.post('/identity/login', loginRequest);
};

export default login;
