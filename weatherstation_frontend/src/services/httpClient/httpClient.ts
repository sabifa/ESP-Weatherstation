import tokenService from '../tokenService/tokenService';

export const baseUrl = process.env.VUE_APP_ENV === 'production'
  ? ''
  : 'https://localhost:5001/api';

enum HttpMethod {
  POST = 'POST',
  GET = 'GET',
}

const send = async <T>(
  url: string,
  method: HttpMethod,
  payload: Record<string, unknown> | null,
  sendAuth: boolean,
): Promise<T> => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (sendAuth) {
    headers.Authorization = `Bearer ${tokenService.getAccessToken()}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };
  if (payload) {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(baseUrl + url, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
};

const httpClient = {
  async get<T>(url: string, sendAuth = true): Promise<T> {
    return send(url, HttpMethod.GET, null, sendAuth);
  },
  async post<T>(
    url: string,
    payload: Record<string, unknown>,
    sendAuth = true,
  ): Promise<T> {
    return send(url, HttpMethod.POST, payload, sendAuth);
  },
};

export default httpClient;
