/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Wrapper, mount, createLocalVue } from '@vue/test-utils';
import { CombinedVueInstance, VueConstructor } from 'vue/types/vue.d';
import VueRouter from 'vue-router';
import CompositionApi from '@vue/composition-api';
import Toast from 'vue-toastification';

const localVue = createLocalVue();

localVue.use(VueRouter);
localVue.use(CompositionApi);
localVue.use(Toast);

export const render = (
  component: VueConstructor<Vue>,
  options?: Record<string, any>,
): [any, Wrapper<CombinedVueInstance<any, object, object, object, Record<never, any>>>] => {
  const wrapper = mount(component, { localVue, ...options });
  const { vm } = wrapper as any;

  return [vm, wrapper];
};
