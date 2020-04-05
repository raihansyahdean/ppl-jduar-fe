import { mount } from '@vue/test-utils'
import RegistrationInstructionPage from '@/components/RegistrationInstructionPage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'jest-canvas-mock'
import axios from 'axios'

Vue.use(BootstrapVue);

jest.mock('axios', () => {
	return jest.fn()
});

afterEach(() => {
	jest.clearAllMocks();
})

describe('RegistrationInstructionPage.vue', () => {
	it('correctly sends the photos to backend', () => {
		const wrapper = mount(RegistrationInstructionPage, {
			data: function() {
				return {
					captured: {
						images: ['images'],
					},
				}
			},
		});
		const method = 'post';
		const url = process.env.VUE_APP_URL_BE + "/crossroads/regist/";
		const payload = JSON.stringify(wrapper.vm.captured);
		wrapper.vm.sendPayload();
		expect(axios).toBeCalledWith({ data:payload, method: method, url: url });
	});

	it('gets the rejected response when sending photos', () => {
		const wrapper = mount(RegistrationInstructionPage);
		const err = { status: 404 };
		axios.post = axios.mockRejectedValue(err);
		wrapper.vm.sendPayload().catch(error => {
			expect(error).toEqual(err);
		});
	});

	it('gets the accepted response when sending photos', () => {
		const wrapper = mount(RegistrationInstructionPage);
		const resp = { status: 200 };
		axios.post = axios.mockResolvedValue(resp);
		wrapper.vm.sendPayload().then(response => {
			expect(response).toEqual(resp);
		});
	});

})
