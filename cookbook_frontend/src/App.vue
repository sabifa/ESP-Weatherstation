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

export default defineComponent({
  name: 'App',
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
