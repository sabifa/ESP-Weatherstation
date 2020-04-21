import { render } from '@/utils/test_utils';
import router from '@/router';
import api from '@/services/api';
import { LoginResponse } from '@/services/api/login';
import { when } from 'jest-when';
import Login from '../Login.vue';

describe('Login', () => {
  const loginResponse: LoginResponse = {
    accessToken: '1234',
    refreshToken: '5678',
  };

  beforeEach(() => {
    jest.spyOn(router, 'push').mockImplementation(() => {});

    const login = jest.spyOn(api, 'login');
    when(login)
      .mockRejectedValue(new Error('login failed'))
      .calledWith({ email: 'my-username', password: 'my-password' })
      .mockReturnValue(Promise.resolve(loginResponse));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('redirects to home after successful login', async () => {
    const [vm, wrapper] = render(Login);

    wrapper.find('[data-testid="email"]').setValue('my-username');
    wrapper.find('[data-testid="password"]').setValue('my-password');
    wrapper.find('input[type="submit"]').trigger('submit');
    await vm.$nextTick();

    expect(router.push).toBeCalledWith('/');
  });

  it('does not redirect login failed', async () => {
    const [vm, wrapper] = render(Login);

    wrapper.find('[data-testid="email"]').setValue('my-username');
    wrapper.find('[data-testid="password"]').setValue('my-wrong-password');
    wrapper.find('input[type="submit"]').trigger('submit');
    await vm.$nextTick();

    expect(router.push).not.toBeCalledWith('/');
  });
});
