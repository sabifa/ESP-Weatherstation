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
    return true;
  },
  clearToken(): void {
    
  }
};

export default tokenService;
