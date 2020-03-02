import { mount } from '@vue/test-utils'
import InstructionPage from '@/components/InstructionPage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue)

describe('InstructionPage.vue', () => {
	const wrapper = mount(InstructionPage)
	
	it('it contains camera video tag', () => {
		expect(wrapper.html()).toContain('<video></video>')
	})
	
	it('it can change instruction if Ambil Foto button is clicked', async () => {
		wrapper.find('#shoot-button').trigger('click')
		expect(wrapper.text()).toContain('depan')
	})
})
