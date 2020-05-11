<template>
  <div class="home">
    <h1>Weatherstation</h1>
    {{ testRequest }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import httpClient from '../services/httpClient/httpClient';

export default defineComponent({
  name: 'Home',
  setup() {
    const testRequest = ref<string>('');

    onMounted(async () => {
      try {
        testRequest.value = await httpClient.get<string>('/test');
      } catch (error) {
        testRequest.value = `Error: ${error}`;
      }
    });


    return { testRequest };
  },
});
</script>
