import { ref, Ref } from '@vue/composition-api';

type usePromiseReturn = {
  createPromise: (...args: any[]) => Promise<void>;
  error: Ref<unknown>;
  loading: Ref<boolean>;
  result: Ref<unknown>;
}

export default function usePromise(fn: Function): usePromiseReturn {
  const result = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const createPromise = async (...args: any[]): Promise<void> => {
    loading.value = true;
    error.value = null;
    result.value = null;

    try {
      result.value = await fn(...args);
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  return {
    createPromise, error, loading, result,
  };
}
