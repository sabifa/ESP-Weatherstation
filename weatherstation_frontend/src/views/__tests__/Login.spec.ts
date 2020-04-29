import { render } from '@/utils/test_utils';
import router from '@/router';
import api from '@/services/api';
import { LoginResponse } from '@/services/api/login';
import { when } from 'jest-when';
import { Wrapper } from '@vue/test-utils';
import Login from '../LoginPage.vue';

// TODO: Extract this to test_utils, currently not working
const mockSuccess = jest.fn();
const mockError = jest.fn();

jest.mock('vue-toastification/composition', () => ({
  useToast() {
    return {
      success: mockSuccess,
      error: mockError,
    };
  },
}));
// const mockToast = useMockToastification();

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
    when(jest.spyOn(api, 'register'))
      .mockRejectedValue(new Error('register failed'))
      .calledWith({
        email: 'my-new-username',
        password: 'my-new-password',
      })
      .mockReturnValue(Promise.resolve(loginResponse));
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  async function registerClick(
    wrapper: Wrapper<any>,
    vm: any,
  ): Promise<void> {
    wrapper.find('[data-testid="register_now"]').trigger('click');
    await vm.$nextTick();
  }

  async function enterMailAndPassword(
    wrapper: Wrapper<any>,
    vm: any,
    mail: string,
    password: string,
  ): Promise<void> {
    wrapper.find('[data-testid="email"]').setValue(mail);
    wrapper.find('[data-testid="password"]').setValue(password);
    wrapper.find('input[type="submit"]').trigger('submit');
    await vm.$nextTick();
  }

  it('redirects to home after successful login', async () => {
    const [vm, wrapper] = render(Login);

    await enterMailAndPassword(wrapper, vm, 'my-username', 'my-password');

    expect(router.push).toBeCalledWith('/');
    expect(mockSuccess).toBeCalledWith('login succeeded');
  });

  it('does not redirect login failed', async () => {
    const [vm, wrapper] = render(Login);

    await enterMailAndPassword(wrapper, vm, 'my-username', 'my-wrong-password');

    expect(router.push).not.toBeCalledWith('/');
    expect(mockError).toBeCalledWith('login failed');
  });

  it('shows register header text if the user wants to register', async () => {
    const [vm, wrapper] = render(Login);

    await registerClick(wrapper, vm);

    expect(wrapper.find('[data-testid="header"]').text()).toBe(
      'Registrieren',
    );
  });

  it('switches back to login header', async () => {
    const [vm, wrapper] = render(Login);

    await registerClick(wrapper, vm);
    expect(wrapper.find('[data-testid="header"]').text()).toBe(
      'Registrieren',
    );

    await registerClick(wrapper, vm);
    expect(wrapper.find('[data-testid="header"]').text()).toBe('Login');
  });

  it('calls api.register instead of api.login', async () => {
    const [vm, wrapper] = render(Login);

    await registerClick(wrapper, vm);
    await enterMailAndPassword(wrapper, vm, 'my-new-username', 'my-new-password');

    expect(api.register).toBeCalled();
    expect(router.push).toBeCalledWith('/');
    expect(mockSuccess).toBeCalledWith('register succeeded');
  });

  it('does not redirect if register fails', async () => {
    const [vm, wrapper] = render(Login);

    await registerClick(wrapper, vm);
    await enterMailAndPassword(wrapper, vm, 'my-new-username', 'my-wrong-password');

    expect(router.push).not.toBeCalledWith('/');
    expect(mockError).toBeCalledWith('register failed');
  });
});
