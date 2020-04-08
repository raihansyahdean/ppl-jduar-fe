import { mount } from '@vue/test-utils'
import RegistrationInstructionPage from '@/components/RegistrationInstructionPage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import VueRouter from "vue-router"
import routes from "@/routes.js"
import Vuex from 'vuex'
import 'jest-canvas-mock'
import axios from 'axios'

Vue.use(Vuex)
Vue.use(BootstrapVue);
Vue.use(VueRouter);

jest.mock('axios', () => {
	return jest.fn()
});

afterEach(() => {
	jest.clearAllMocks();
})

const store = new Vuex.Store({
    state: {
		passcodeIDs: []
    },
    mutations: {
		updateIds (state, ids) {
			state.passcodeIDs = ids;
		}
    },
    actions: {
		async updateIds ({ commit }, ids) {
			commit('updateIds', ids)
		}
    }
})


describe('RegistrationInstructionPage.vue', () => {
	const router = new VueRouter({ routes });
	router.push("/registration/passcode");

	const wrapper = mount(RegistrationInstructionPage, {
		Vue,
		router,
		store,
		data: function() {
			return {
				captured: {
					images: ['images'],
				},
			}
		},
	});

	it('correctly sends the photos to backend', () => {
		const method = 'post';
		const url = process.env.VUE_APP_URL_BE + "/crossroads/regist/";
		const payload = JSON.stringify(wrapper.vm.captured);
		wrapper.vm.sendPayload(0);
		expect(axios).toBeCalledWith({ data:payload, method: method, url: url });
		expect(router.currentRoute.fullPath).toBe("/registration/passcode");
	});

	it('gets the rejected response when sending photos', () => {
		const err = { status: 404 };
		axios.post = axios.mockRejectedValue(err);
		wrapper.vm.sendPayload(0).catch(error => {
			expect(error).toEqual(err);
		});
	});

	it('gets the accepted response when sending photos', () => {
		const resp = { status: 200, data: {available_passcodes: ['Apple'] }};
		axios.post = axios.mockResolvedValue(resp);
		wrapper.vm.sendPayload(0).then(response => {
			expect(response).toEqual(resp);
		});
	});
})
