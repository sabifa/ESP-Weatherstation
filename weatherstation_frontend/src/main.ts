/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueCompositionApi);
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store: store.original,
  render: (h): any => h(App),
}).$mount('#app');
