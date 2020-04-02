import { mount } from '@vue/test-utils'
import RegistrationReadyPage from '@/components/RegistrationReadyPage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import VueRouter from "vue-router"
import routes from "@/routes.js"

Vue.use(BootstrapVue);
Vue.use(VueRouter);

describe('RegistrationReadyPage.vue', () => {
	const router = new VueRouter({ routes });
	const wrapper = mount(RegistrationReadyPage, { 
		Vue,
		router
	});

	it('contains ready page instruction', () => {
		expect(wrapper.html()).toContain('Posisikan wajah anda di hadapan kamera');
	});

	it('redirect the page to instruction page if Mulai Button is clicked', async () => {
		const button = wrapper.find('#start-button');
		button.trigger('click');
		router.push("/registration/start");
		await wrapper.vm.$nextTick();
		expect(router.currentRoute.fullPath).toBe('/registration/start');
	});
})
