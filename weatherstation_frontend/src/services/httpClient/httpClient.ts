export const baseUrl = process.env.VUE_APP_ENV === 'production' ? '' : 'https://localhost:5001/api';

enum HttpMethod {
  POST = 'POST',
}

const send = async <T>(
  url: string,
  method: HttpMethod,
  payload: Record<string, unknown>,
): Promise<T> => {
  const response = await fetch(baseUrl + url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
};

const httpClient = {
  get(url: string): void {
    console.log(url);
  },
  async post<T>(url: string, payload: Record<string, unknown>): Promise<T> {
    return send(url, HttpMethod.POST, payload);
  },
};

export default httpClient;
