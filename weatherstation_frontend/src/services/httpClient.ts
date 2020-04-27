const baseUrl = process.env.VUE_APP_ENV === 'production' ? '' : 'https://localhost:5001/api';

const httpClient = {
  get(url: string): void {
    console.log(url);
  },
  async post<T>(url: string, payload: Record<string, any>): Promise<T> {
    const response = await fetch(baseUrl + url, {
      method: 'POST',
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
  },
};

export default httpClient;
