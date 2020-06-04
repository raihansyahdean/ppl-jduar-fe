import { mount } from '@vue/test-utils'
import CashierLoginPage from '@/components/CashierLoginPage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue);

describe('CashierLoginPage.vue', () => {
	const wrapper = mount(CashierLoginPage, { 
		Vue,
	});

	it('contains registration form', () => {
		expect(wrapper.html()).toContain('Username');
		expect(wrapper.html()).toContain('Password');
	});
})
