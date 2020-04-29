import { LoginRequest, LoginResponse } from './login';

const register = async (
  loginRequest: LoginRequest,
): Promise<LoginResponse> => Promise.resolve({} as LoginResponse);

export default register;
