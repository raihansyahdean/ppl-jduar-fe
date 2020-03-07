import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './registerServiceWorker'

Vue.config.productionTip = false
export const BASE_ROUTE = process.env.VUE_APP_BASE_ROUTE || '/'

// Install Routing
Vue.use(VueRouter);
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

const router = new VueRouter({
  mode: "history",
  base: BASE_ROUTE,
  routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
