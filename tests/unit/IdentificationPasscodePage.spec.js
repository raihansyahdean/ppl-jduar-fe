import { mount } from '@vue/test-utils'
import IdentificationPasscodePage from '@/components/IdentificationPasscodePage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import VueRouter from "vue-router"
import routes from "@/routes.js"
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(BootstrapVue);
Vue.use(VueRouter);

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
		async updateIds ({ commit }, ids) {
			commit('updateIds', ids)
		}
    }
})

describe('IdentificationPasscodePage.vue', () => {
	const router = new VueRouter({ routes });
	const wrapper = mount(IdentificationPasscodePage, { 
		Vue,
		router,
		store,
		attachToDocument: true,
	});

	it('contains the appropriate number of passcodes according to store', async () => {
		var passcodes = wrapper.findAll('.passcode-icon');
		expect(passcodes.length).toBe(3);
	});

	it('closes the modal if Tidak button is clicked', async () => {
		const passcode = wrapper.find('#passcode-Apple');
		passcode.trigger('click');
		await wrapper.vm.$nextTick();

		const modal = wrapper.find('#confirmation-modal');
		expect(modal.attributes().style).toContain("display: block;");

		const noButton = wrapper.find('#no-button');
		noButton.trigger('click');
		
		const waitRAF = () => new Promise(resolve => requestAnimationFrame(resolve));

		await wrapper.vm.$nextTick();
		await waitRAF();
		await wrapper.vm.$nextTick();
		await waitRAF();
		expect(modal.attributes().style).toContain("display: none;");
	});

	
	it('doesnt load passcodes if nothing in store', async () => {
		const store = new Vuex.Store({
			state: {
				passcodeIDs: undefined
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
		
		const wrapper2 = mount(IdentificationPasscodePage, { 
			Vue,
			router,
			store,
			attachToDocument: true,
		});

		expect(wrapper2.html()).not.toContain('.passcode-icon');
	});
})
