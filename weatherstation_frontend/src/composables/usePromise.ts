/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ref } from '@vue/composition-api';

export default function usePromise<T, R extends unknown[]>(
  fn: (...args: R) => Promise<T>,
) {
  const result = ref<T>();
  const loading = ref(false);
  const error = ref();

  const createPromise = async (...args: R): Promise<void> => {
    loading.value = true;
    error.value = undefined;
    result.value = undefined;

    try {
      result.value = await fn(...args);
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    createPromise,
    error,
    loading,
    result,
  };
}
