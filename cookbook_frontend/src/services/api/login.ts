import httpClient from '../httpClient';

export type LoginRequest = {
  email: string;
  password: string;
}

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
}

const login = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
  // TODO: Maybe müssen wir hier gar nicht catchen?
  try {
    return httpClient.post('/identity/login', loginRequest);
  } catch (error) {
    throw new Error(error);
  }
};

export default login;
