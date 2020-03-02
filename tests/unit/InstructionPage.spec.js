import { mount } from '@vue/test-utils'
import InstructionPage from '@/components/InstructionPage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import {render, fireEvent} from '@testing-library/vue'
import routes from "@/routes.js"

Vue.use(BootstrapVue)

describe('InstructionPage.vue', () => {
	const wrapper = mount(InstructionPage)
	
	it('it contains camera video tag', () => {
		expect(wrapper.html()).toContain('<video></video>')
	})
	
	it('it can change instruction if Ambil Foto button is clicked', async () => {
		const {getByText} = render(InstructionPage)

		getByText('Hadapkan kepala Anda ke arah depan.')
	
		const button = getByText('Ambil Foto')
	
		await fireEvent.click(button)
		getByText('Hadapkan kepala Anda ke arah kanan.')

		await fireEvent.click(button)
		getByText('Hadapkan kepala Anda ke arah kiri.')

		await fireEvent.click(button)
		getByText('Hadapkan kepala Anda ke arah atas.')

		await fireEvent.click(button)
		getByText('Hadapkan kepala Anda ke arah bawah.')
	})

	it('it redirect the page to ready page if instructions if finished', async () => {
		const {getByText} = render(InstructionPage, {routes}, (vue, store, router) => {
			router.push('/ready')
		})

		const button = getByText('Ambil Foto')
		await fireEvent.click(button)
		await fireEvent.click(button)
		await fireEvent.click(button)
		await fireEvent.click(button)
		await fireEvent.click(button)

		expect(window.location.href).toContain("/ready")
	})
})
