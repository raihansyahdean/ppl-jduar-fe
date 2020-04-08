import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		passcodeIDs: []
    },
    mutations: {
		updateIds (state, ids) {
			// mutate state
			state.passcodeIDs = ids;
		}
    },
    actions: {
		updateIds ({ commit }, ids) {
			commit('updateIds', ids)
		}
    }
})

export default store;