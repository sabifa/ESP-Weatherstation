<template>
  <div class="login">
    <Register v-if="userWantsToRegister" />
    <Login v-else />
    <div
      data-testid="register_now"
      class="register_now"
      @click="switchRegister"
    >
      <span v-if="userWantsToRegister">Möchtest du dich einloggen?</span>
      <span v-else>Du bist neu? Registriere dich hier</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import Login from '../components/Login/Login.vue';
import Register from '../components/Login/Register.vue';

export default defineComponent({
  name: 'LoginPage',
  components: {
    Login,
    Register,
  },
  setup() {
    const userWantsToRegister = ref(false);

    const switchRegister = (): void => {
      userWantsToRegister.value = !userWantsToRegister.value;
    };

    return {
      switchRegister,
      userWantsToRegister,
    };
  },
});
</script>

<style lang="scss" scoped>
.register_now {
  cursor: pointer;
}
</style>
