import { mount } from '@vue/test-utils'
import IdentificationFailPage from '@/components/IdentificationFailPage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import VueRouter from "vue-router"
import routes from "@/routes.js"

Vue.use(BootstrapVue);
Vue.use(VueRouter);

describe('IdentificationFailPage.vue', () => {
	const router = new VueRouter({ routes });
	const wrapper = mount(IdentificationFailPage, { 
		Vue,
		router
	});

	it('contains identification fail page status', () => {
		expect(wrapper.html()).toContain('Identifikasi Gagal');
	});

	it('redirect the page to ready page if Identifikasi Ulang button is clicked', async () => {
		const button = wrapper.find('#retry-button');
		button.trigger('click');
		router.push("/identification/ready");
		await wrapper.vm.$nextTick();
		expect(router.currentRoute.fullPath).toBe('/identification/ready');
    });
    
    it('redirect the page to home page if Menu Utama button is clicked', async () => {
		const button = wrapper.find('#fail-menu-button');
        button.trigger('click');
        router.push("/");
		await wrapper.vm.$nextTick();
		expect(router.currentRoute.fullPath).toBe('/');
    });
})
