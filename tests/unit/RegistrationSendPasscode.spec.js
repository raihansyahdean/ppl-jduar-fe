import { mount } from '@vue/test-utils'
import RegistrationPasscodePage from '@/components/RegistrationPasscodePage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import VueRouter from "vue-router"
import routes from "@/routes.js"
import Vuex from 'vuex'
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
		passcodeIDs: ['Apple', 'Watermelon', 'Lemon']
    },
    mutations: {
		updateIds (state, ids) {
			state.passcodeIDs = ids;
		}
    },
    actions: {
		updateIds ({ commit }, ids) {
			commit('updateIds', ids)
		}
    }
})

describe('RegistrationPasscodePage.vue', () => {
	const router = new VueRouter({ routes });
	router.push("/registration/success");

	const wrapper = mount(RegistrationPasscodePage, {
		Vue,
		router,
		store,
		data: function() {
			return {
				data: function() {
				return {
					selectedPasscode : "Apple"
				}
			},
			}
		},
	});

	it('correctly sends the passcode to backend and redirect to success page', () => {
		const method = 'post';
		const url = process.env.VUE_APP_URL_BE + "/crossroads/registpasscode/";
		const payload = JSON.parse(JSON.stringify({"chosen_passcode" : wrapper.vm.selectedPasscode	}));
		wrapper.vm.choosePasscode();
		expect(axios).toBeCalledWith({ data:payload, method: method, url: url });
		expect(router.currentRoute.fullPath).toBe("/registration/success");
	});

	it('gets the rejected response when sending passcode', () => {
		const err = { status: 404 };
		axios.post = axios.mockRejectedValue(err);
		wrapper.vm.choosePasscode().catch(error => {
			expect(error).toEqual(err);
		});
	});

	it('gets the accepted response when sending passcode', () => {
		const resp = { status: 200 };
		axios.post = axios.mockResolvedValue(resp);
		wrapper.vm.choosePasscode().then(response => {
			expect(response).toEqual(resp);
		});
	});
})
