import { when } from 'jest-when';
import tokenService, { tokenServiceConstants } from '../tokenService';

describe('tokenService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('storeToken', () => {
    beforeEach(() => {
      jest
        .spyOn(Storage.prototype, 'setItem')
        .mockImplementation(() => {});
      jest
        .spyOn(Storage.prototype, 'removeItem')
        .mockImplementation(() => {});
    });

    it('stores token to localStorage', () => {
      tokenService.storeToken('123', '456');

      expect(localStorage.setItem).toBeCalledWith(
        tokenServiceConstants.accessToken,
        '123',
      );
      expect(localStorage.setItem).toBeCalledWith(
        tokenServiceConstants.refreshToken,
        '456',
      );
    });
  });

  describe('getters', () => {
    beforeEach(() => {
      const localStorageGetSpy = jest.spyOn(Storage.prototype, 'getItem');
      when(localStorageGetSpy)
        .calledWith(tokenServiceConstants.accessToken)
        .mockReturnValue('my-access-token');
      when(localStorageGetSpy)
        .calledWith(tokenServiceConstants.refreshToken)
        .mockReturnValue('my-refresh-token');
    });

    it('returns stored tokens', () => {
      expect(tokenService.getAccessToken()).toBe('my-access-token');
      expect(tokenService.getRefreshToken()).toBe('my-refresh-token');
    });
  });

  describe('isExpired', () => {
    it('returns true if token is expired', () => {
      const result = tokenService.isExpired(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwianRpIjoiMTIzIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwidXNlcklkIjoiMTIzIiwicm9sZSI6IlVzZXIiLCJuYmYiOjE1ODkxNzk5MTgsImV4cCI6MTU4OTE4MDUxOCwiaWF0IjoxNTg5MTc5OTE4fQ.H3AFmPaKXUooX82-F366Unr7OLxlfdtdoxy7-W216k0',
      );

      expect(result).toBeTruthy();
    });

    it('returns false if token is not expired', () => {
      // expires 11/13/2273
      const result = tokenService.isExpired(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwianRpIjoiMTIzIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwidXNlcklkIjoiMTIzIiwicm9sZSI6IlVzZXIiLCJuYmYiOjE1ODkxNzk5MTgsImV4cCI6OTU4OTE4MDUxOCwiaWF0IjoxNTg5MTc5OTE4fQ.8hqwk-P0hKiptfAW6AR91tk83HxPJs6eoIN38rAl8eE',
      );

      expect(result).toBeFalsy();
    });
  });

  describe('clearToken', () => {
    it('removes both tokens from localStorage', () => {
      const proto = Object.getPrototypeOf(window.localStorage);
      jest.spyOn(proto, 'removeItem');

      tokenService.clearToken();

      expect(localStorage.removeItem).toBeCalledWith(
        tokenServiceConstants.accessToken,
      );
      expect(localStorage.removeItem).toBeCalledWith(
        tokenServiceConstants.refreshToken,
      );
    });
  });
});
