<template>
  <div>
    <h1 data-testid="header">
      Login
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
        v-model="password"
        data-testid="password"
        placeholder="Passwort"
        type="password"
        autocomplete="current-password"
        required
      />
      <el-input
        v-loading="loading"
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
    const {
      createPromise,
      error,
      loading,
    } = usePromise(async (email: string, password: string) =>
      api.login({ email, password }));
    const toast = useToast();
    const email = ref('');
    const password = ref('');

    const handleSubmit = async (): Promise<void> => {
      await createPromise(email.value, password.value);

      if (error.value) {
        toast.error('Login fehlgeschlagen');
      } else {
        router.push('/');
        toast.success('Login erfolgreich');
      }
    };

    return {
      handleSubmit,
      email,
      password,
      loading,
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
