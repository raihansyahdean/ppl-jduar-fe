import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import routes from "./routes"

import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

// Install Routing
Vue.use(VueRouter);
// Install BootstrapVue
Vue.use(BootstrapVue)

const router = new VueRouter({
  mode: "history",
  routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
