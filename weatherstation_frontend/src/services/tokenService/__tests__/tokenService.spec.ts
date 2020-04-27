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
});
