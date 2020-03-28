import { mount } from '@vue/test-utils'
import RegistrationFailPage from '@/components/RegistrationFailPage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import VueRouter from "vue-router"
import routes from "@/routes.js"

Vue.use(BootstrapVue);
Vue.use(VueRouter);

describe('RegistrationFailPage.vue', () => {
	const router = new VueRouter({ routes });
	const wrapper = mount(RegistrationFailPage, { 
		Vue,
		router
	});

	it('contains registration fail page status', () => {
		expect(wrapper.html()).toContain('Registrasi Gagal');
	});

	it('redirect the page to ready page if Registrasi Ulang button is clicked', async () => {
		const button = wrapper.find('#retry-button');
		button.trigger('click');
		router.push("/ready");
		await wrapper.vm.$nextTick();
		expect(router.currentRoute.fullPath).toBe('/ready');
    });
    
    it('redirect the page to home page if Menu Utama button is clicked', async () => {
		const button = wrapper.find('#fail-menu-button');
        button.trigger('click');
        router.push("/");
		await wrapper.vm.$nextTick();
		expect(router.currentRoute.fullPath).toBe('/');
    });
})
