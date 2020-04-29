<template>
  <div id="app">
    <div class="nav">
      <router-link to="/">
        Home
      </router-link>
      |
      <router-link to="/login">
        Login
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import 'vue-toastification/dist/index.css';
import { provideToast } from 'vue-toastification/composition';

export default defineComponent({
  name: 'App',
  setup() {
    provideToast({ pauseOnFocusLoss: false, pauseOnHover: false });
  },
});
</script>

<style lang="scss">
#app {
  font-family: 'Quicksand', Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  color: #2c3e50;
  text-decoration: none;
}

.router-link-exact-active {
  color: #00a1ff;
}
</style>
