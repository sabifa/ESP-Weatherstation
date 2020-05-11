export const tokenServiceConstants = {
  accessToken: 'ACCESS_TOKEN',
  refreshToken: 'REFRESH_TOKEN',
};

const tokenService = {
  storeToken(accessToken: string, refreshToken: string): void {
    localStorage.setItem(tokenServiceConstants.accessToken, accessToken);
    localStorage.setItem(tokenServiceConstants.refreshToken, refreshToken);
  },
  getAccessToken(): string | null {
    return localStorage.getItem(tokenServiceConstants.accessToken);
  },
  getRefreshToken(): string | null {
    return localStorage.getItem(tokenServiceConstants.refreshToken);
  },
  isExpired(accessToken: string): boolean {
    const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
    const nowInUnix = Math.round((new Date()).getTime() / 1000);

    return decodedToken.exp < nowInUnix;
  },
  clearToken(): void {
    localStorage.removeItem(tokenServiceConstants.accessToken);
    localStorage.removeItem(tokenServiceConstants.refreshToken);
  },
};

export default tokenService;
