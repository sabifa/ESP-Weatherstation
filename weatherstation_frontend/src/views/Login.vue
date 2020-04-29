<template>
  <div class="login">
    <h1>Login</h1>
    <form
      class="form"
      @submit.prevent="handleSubmit"
    >
      <input
        v-model="email"
        data-testid="email"
        placeholder="email"
      >
      <input
        v-model="password"
        data-testid="password"
        placeholder="passwort"
      >
      <input type="submit">
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { useToast } from 'vue-toastification/composition';
import router from '../router';
import api from '../services/api';

export default defineComponent({
  name: 'Login',
  setup() {
    const toast = useToast();
    const email = ref('');
    const password = ref('');

    const handleSubmit = async (): Promise<void> => {
      try {
        await api.login({ email: email.value, password: password.value });
        router.push('/');
        toast.success('login succeeded');
      } catch (error) {
        toast.error('login failed');
      }
    };

    return { handleSubmit, email, password };
  },
});
</script>

<style lang="scss" scoped>
.form {
  width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  input:last-child {
    width: 80px;
    margin-top: 5px;
    margin-left: auto;
  }
}
</style>
