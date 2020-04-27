import { RawLocation, Route } from 'vue-router';
import tokenService from '@/services/tokenService/tokenService';
import router, { beforeEach } from '..';

describe('router', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('redirects to public route', () => {
    const to = {
      matched: [{ meta: { isPublic: true } }],
    } as Route;
    const from = {} as Route;
    const next = jest.fn();

    beforeEach(to, from, next);

    expect(next).toBeCalled();
  });

  it('redirects to private route if token can be retrieved', () => {
    jest
      .spyOn(tokenService, 'getAccessToken')
      .mockReturnValue('123-token');
    const to = {
      matched: [{ meta: {} }],
    } as Route;
    const from = {} as Route;
    const next = jest.fn();

    beforeEach(to, from, next);

    expect(next).toBeCalledWith();
  });

  it('redirects to /login if route is private and no token can be retrieved', () => {
    jest.spyOn(tokenService, 'getAccessToken').mockReturnValue(null);
    const to = {
      fullPath: '/some-route-after-login',
      matched: [{ meta: {} }],
    } as Route;
    const from = {} as Route;
    const next = jest.fn();

    beforeEach(to, from, next);

    expect(next).toBeCalledWith({
      name: 'Login',
      params: { nextUrl: '/some-route-after-login' },
    });
  });

  it('just call next if we want to go to /login', () => {
    jest.spyOn(tokenService, 'getAccessToken').mockReturnValue(null);
    const to = {
      path: '/login',
      fullPath: '/some-route-after-login',
      matched: [{ meta: {} }],
    } as Route;
    const from = {} as Route;
    const next = jest.fn();

    beforeEach(to, from, next);

    expect(next).toBeCalledWith();
  });

  it('redirects back to home if user is logged in and wants to enter /login', () => {
    jest.spyOn(tokenService, 'getAccessToken').mockReturnValue('123-token');
    const to = {
      path: '/login',
      matched: [{ meta: { isPublic: true } }],
    } as Route;
    const from = {} as Route;
    const next = jest.fn();

    beforeEach(to, from, next);

    expect(next).toBeCalledWith({
      name: 'Home',
    });
  });
});
