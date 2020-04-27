import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueCompositionApi);
Vue.use(Toast, {
  pauseOnFocusLoss: false,
  pauseOnHover: false,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store: store.original,
  render: (h) => h(App),
}).$mount('#app');
