import { mount } from '@vue/test-utils'
import RegistrationSuccessPage from '@/components/RegistrationSuccessPage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import VueRouter from "vue-router"
import routes from "@/routes.js"

Vue.use(BootstrapVue);
Vue.use(VueRouter);

describe('RegistrationSuccessPage.vue', () => {
	const router = new VueRouter({ routes });
	const wrapper = mount(RegistrationSuccessPage, { 
		Vue,
		router
	});

	it('contains registration success page status', () => {
		expect(wrapper.html()).toContain('Registrasi Sukses!');
	});

	it('redirect the page to home page if Kembali ke Menu Button is clicked', async () => {
		const button = wrapper.find('#menu-button');
		button.trigger('click');
		router.push("/");
		await wrapper.vm.$nextTick();
		expect(router.currentRoute.fullPath).toBe('/');
	});
})
