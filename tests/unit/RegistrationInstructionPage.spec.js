import { mount } from '@vue/test-utils'
import RegistrationInstructionPage from '@/components/RegistrationInstructionPage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import {render, fireEvent} from '@testing-library/vue'
import routes from "@/routes.js"
import 'jest-canvas-mock'

Vue.use(BootstrapVue);

describe('RegistrationInstructionPage.vue', () => {
	it('contains camera video tag', () => {
		const wrapper = mount(RegistrationInstructionPage);
		expect(wrapper.html()).toContain('<video></video>');
	});
	
	it('can change instruction if Ambil Foto button is clicked', async () => {
		const {getByText} = render(RegistrationInstructionPage);

		getByText('Hadapkan kepala Anda ke arah depan.');
	
		const button = getByText('Ambil Foto');

		await fireEvent.click(button);
		getByText('Hadapkan kepala Anda ke arah kanan.');

		await fireEvent.click(button);
		getByText('Hadapkan kepala Anda ke arah kiri.');

		await fireEvent.click(button);
		getByText('Hadapkan kepala Anda ke arah atas.');

		await fireEvent.click(button);
		getByText('Hadapkan kepala Anda ke arah bawah.');
	});

	it('redirect the page to ready page if instructions if finished', async () => {
		const {getByText} = render(RegistrationInstructionPage, {routes}, (vue, store, router) => {
			router.push('/registration/passcode');
		})

		const button = getByText('Ambil Foto');
		await fireEvent.click(button);
		await fireEvent.click(button);
		await fireEvent.click(button);
		await fireEvent.click(button);
		await fireEvent.click(button);

		expect(window.location.href).toContain("/registration/passcode");
	});
})
