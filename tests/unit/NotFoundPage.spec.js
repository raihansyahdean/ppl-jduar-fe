import { mount } from '@vue/test-utils'
import NotFoundPage from '@/components/NotFoundPage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import VueRouter from "vue-router"
import routes from "@/routes.js"

Vue.use(BootstrapVue);
Vue.use(VueRouter);

describe('NotFoundPage.vue', () => {
	const router = new VueRouter({ routes });
	const wrapper = mount(NotFoundPage, { 
		Vue,
		router
	});

	it('contains 404 not found page status', () => {
		expect(wrapper.html()).toContain('Halaman tidak ditemukan');
	});

	it('redirect the page to home page if Kembali ke Menu Button is clicked', async () => {
		const button = wrapper.find('#fail-menu-button');
		button.trigger('click');
		router.push("/");
		await wrapper.vm.$nextTick();
		expect(router.currentRoute.fullPath).toBe('/');
	});
})
