import { mount } from '@vue/test-utils'
import CashierRegistrationPage from '@/components/CashierRegistrationPage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue);

describe('CashierRegistrationPage.vue', () => {
	const wrapper = mount(CashierRegistrationPage, { 
		Vue,
	});

	it('contains registration form', () => {
		expect(wrapper.html()).toContain('Nama');
		expect(wrapper.html()).toContain('Username');
		expect(wrapper.html()).toContain('Merchant');
		expect(wrapper.html()).toContain('Cabang Merchant');
		expect(wrapper.html()).toContain('Password');
	});
})
