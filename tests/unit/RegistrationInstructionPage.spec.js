import { mount } from '@vue/test-utils'
import RegistrationInstructionPage from '@/components/RegistrationInstructionPage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'jest-canvas-mock'

Vue.use(BootstrapVue);

describe('RegistrationInstructionPage.vue', () => {
	it('contains camera video', () => {
		const wrapper = mount(RegistrationInstructionPage);
		expect(wrapper.html()).toContain('id="video"');
	});

	it('contains circle progress bar', () => {
		const wrapper = mount(RegistrationInstructionPage);
		expect(wrapper.html()).toContain('circle-progress');
	});
	
	it('contains registration instruction', () => {
		const wrapper = mount(RegistrationInstructionPage);
		expect(wrapper.html()).toContain('Hadapkan kepala Anda ke arah');
	});

	it('does not contain manual Ambil Foto button', () => {
		const wrapper = mount(RegistrationInstructionPage);
		expect(wrapper.find('#shoot-button').exists()).toBe(false);
	});
})