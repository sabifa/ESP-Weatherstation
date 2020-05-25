<template>
  <div class="home">
    <h1>Weatherstation</h1>
    <div v-loading="loading">
      <div v-if="error">
        {{ error }}
      </div>Result:
      <div v-if="result">
        {{ result }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable import/no-cycle */
import { defineComponent, onBeforeMount } from '@vue/composition-api';
import usePromise from '../composables/usePromise';
import api from '../services/api';

export default defineComponent({
  name: 'Home',
  setup() {
    const {
      createPromise, error, loading, result,
    } = usePromise(() =>
      api.getAllSensorsForUser());

    onBeforeMount(async () => {
      await createPromise();
    });

    return { error, loading, result };
  },
});
</script>
