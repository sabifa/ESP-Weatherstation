<template>
  <div>
    <h1 data-testid="header">
      <span v-if="register">Registrieren</span>
      <span v-else>Login</span>
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
        v-loading="false"
        type="submit"
        value="Absenden"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
import { useToast } from 'vue-toastification/composition';
import router from '../../router';
import api from '../../services/api';

export default defineComponent({
  name: 'Login',
  props: {
    register: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const toast = useToast();
    const email = ref('');
    const password = ref('');

    const toastActionText = computed(() =>
      (props.register ? 'register' : 'login'));

    const handleSubmit = async (): Promise<void> => {
      try {
        if (props.register) {
          await api.register({
            email: email.value,
            password: password.value,
          });
        } else {
          await api.login({
            email: email.value,
            password: password.value,
          });
        }

        router.push('/');
        toast.success(`${toastActionText.value} succeeded`);
      } catch (error) {
        toast.error(`${toastActionText.value} failed`);
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
