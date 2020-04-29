import { mount } from '@vue/test-utils'
import IdentificationPasscodePage from '@/components/IdentificationPasscodePage.vue'
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

describe('IdentificationPasscodePage.vue', () => {
	const router = new VueRouter({ routes });
	router.push("/identification/success");

	const wrapper = mount(IdentificationPasscodePage, {
		Vue,
		router,
		store,
		data: function() {
			return {
				data: function() {
				return {
					chosenPasscode : "Apple"
				}
			},
			}
		},
	});

	it('correctly sends the passcode to backend and redirect to success page', () => {
		const method = 'post';
		const url = process.env.VUE_APP_URL_BE + "/crossroads/identifypasscode/";
		const payloadData = JSON.parse(JSON.stringify({"passcode" : wrapper.vm.chosenPasscode	}));
		wrapper.vm.choosePasscode();
		expect(axios).toBeCalledWith({ data:payloadData, method: method, url: url });
		expect(router.currentRoute.fullPath).toBe("/identification/success");
	});

	it('gets the rejected response when sending passcode', () => {
		const err = { status: 404 };
		axios.post = axios.mockRejectedValue(err);
		wrapper.vm.choosePasscode().catch(error => {
			expect(error).toEqual(err);
		});
	});

	it('gets the accepted incorrect Passcode response', () => {
		const resp = { status: 200, data: {message: 'Passcode Incorrect'}};
		axios.post = axios.mockResolvedValue(resp);
		wrapper.vm.choosePasscode().then(response => {
			expect(response).toEqual(resp);
			expect(router.currentRoute.fullPath).toBe("/identification/fail");
		});
	});

	it('gets the accepted correct passcode response', () => {
		const resp = { status: 200, data: {message: 'Identification Success'}};
		axios.post = axios.mockResolvedValue(resp);
		wrapper.vm.choosePasscode().then(response => {
			expect(response).toEqual(resp);
			expect(router.currentRoute.fullPath).toBe("/identification/success");
		});
	});
})
