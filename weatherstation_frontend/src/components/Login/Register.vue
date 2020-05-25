<template>
  <div class="register">
    <h1 data-testid="header">
      Registrieren
    </h1>
    <form
      ref="loginForm"
      class="form"
      @submit.prevent="handleSubmit"
    >
      <el-input
        v-model="email"
        data-testid="email"
        placeholder="Email"
        type="email"
        autocomplete="username"
        required
      />
      <el-input
        v-model="email"
        data-testid="email"
        placeholder="Email"
        type="email"
        autocomplete="username"
        required
      />
      <el-input
        v-model="password"
        data-testid="password"
        placeholder="Passwort"
        type="password"
        autocomplete="current-password"
        required
      />
      <el-input
        v-loading="false"
        type="submit"
        value="Absenden"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { useToast } from 'vue-toastification/composition';
import usePromise from '@/composables/usePromise';
import router from '../../router';
import api from '../../services/api';

export default defineComponent({
  name: 'Login',
  setup() {
    const toast = useToast();
    const email = ref('');
    const password = ref('');

    const handleSubmit = async (): Promise<void> => {
      const { createPromise, error } = usePromise(async (e: string, p: string) =>
        api.register({ email: e, password: p }));

      await createPromise(email.value, password.value);

      if (error.value) {
        toast.error('Registrierung fehlgeschlagen');
      } else {
        router.push('/');
        toast.success('Registrierung erfolgreich');
      }
    };

    return {
      handleSubmit,
      email,
      password,
    };
  },
});
</script>

<style lang="scss" scoped>
.login {
  .form {
    width: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    .el-input,
    .el-button {
      margin-bottom: 10px;
    }
  }
}
</style>
