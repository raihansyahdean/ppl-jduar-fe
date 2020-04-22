import { mount } from '@vue/test-utils'
import IdentificationReadyPage from '@/components/IdentificationReadyPage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import VueRouter from "vue-router"
import routes from "@/routes.js"

Vue.use(BootstrapVue);
Vue.use(VueRouter);

describe('IdentificationReadyPage.vue', () => {
	const router = new VueRouter({ routes });
	const wrapper = mount(IdentificationReadyPage, { 
		Vue,
		router
	});

	it('contains ready page instruction', () => {
		expect(wrapper.html()).toContain('Posisikan wajah anda di hadapan kamera');
	});

	it('redirect the page to identification page if Mulai Button is clicked', async () => {
		const button = wrapper.find('#start-button');
		button.trigger('click');
		router.push("/identification/start");
		await wrapper.vm.$nextTick();
		expect(router.currentRoute.fullPath).toBe('/identification/start');
	});
})
