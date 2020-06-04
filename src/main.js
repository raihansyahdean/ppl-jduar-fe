import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './registerServiceWorker'

import axios from 'axios'

const token = localStorage.getItem('token')
if (token) {
	axios.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false

// Install Routing
Vue.use(VueRouter);
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

const router = new VueRouter({
	mode: "history",
	routes
});

router.beforeEach((to, from, next) => {
	if(to.matched.some(record => record.meta.requiresAuth)) {
		if (store.getters.isLoggedIn) {
			next()
			return
		}
		next('/cashier/login') 
	} else {
		next() 
	}
	
	if (to.matched.some(record => record.meta.hideForAuth)) {
		if (store.getters.isLoggedIn) {
			next('/');
		} else {
			next();
		}
	} else {
		next();
	}
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
