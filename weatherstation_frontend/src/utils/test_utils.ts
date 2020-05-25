/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Wrapper, mount, createLocalVue } from '@vue/test-utils';
import { CombinedVueInstance, VueConstructor } from 'vue/types/vue.d';
import VueRouter from 'vue-router';
import CompositionApi from '@vue/composition-api';
import ElementUI from 'element-ui';

const localVue = createLocalVue();

localVue.use(VueRouter);
localVue.use(CompositionApi);
localVue.use(ElementUI);

export const render = (
  component: VueConstructor<Vue>,
  options?: Record<string, any>,
): [any, Wrapper<CombinedVueInstance<any, object, object, object, Record<never, any>>>] => {
  const wrapper = mount(component, { localVue, ...options });
  const { vm } = wrapper as any;

  return [vm, wrapper];
};

export const useMockToastification = () => {
  const mockSuccess = jest.fn();
  const mockError = jest.fn();

  jest.mock('vue-toastification/composition', () => ({
    useToast(): any {
      return {
        success: mockSuccess,
        error: mockError,
      };
    },
  }));
  return {
    success: mockSuccess,
    error: mockError,
  };
};
