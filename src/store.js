import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		passcodeIDs: [],
		status: '',
		token: localStorage.getItem('token') || '',
		user: {},
    },
    mutations: {
		updateIds (state, ids) {
			// mutate state
			state.passcodeIDs = ids;
		},
		auth_request (state) {
			state.status = 'loading';
		},
		auth_success (state, token, user) {
			state.status = 'success';
			state.token = token;
			state.user = user;
		},
		auth_error (state) {
			state.status = 'error';
		},
		logout(state) {
			state.status = '';
			state.token = '';
		},
    },
    actions: {
		updateIds ({ commit }, ids) {
			commit('updateIds', ids)
		},
		login ({commit}, user) {
			return new Promise((resolve, reject) => {
				commit('auth_request')
				axios({
                    data: user,
                    method: 'post',
                    url: process.env.VUE_APP_URL_BE + "/cashier/login/",
				})
				.then(response => {
					const token = response.data.token;
					const user = response.data.user;
					localStorage.setItem('token', token);
					axios.defaults.headers.common['Authorization'] = token;
					commit('auth_success', token, user);
					resolve(response);
				}).catch(error => {
					commit('auth_error');
					localStorage.removeItem('token');
					reject(error);
				})
			})
		},
		logout ({commit}) {
			return new Promise((resolve) => {
				commit('logout');
				localStorage.removeItem('token');
				delete axios.defaults.headers.common['Authorization'];
				resolve();
			})
		},
		regist ({commit}, cashier) {
			return new Promise((resolve, reject) => {
				commit('auth_request')
				axios({
                    data: cashier,
                    method: 'post',
                    url: process.env.VUE_APP_URL_BE + "/cashier/regist/",
				})
				.then(response => {
					localStorage.setItem('token',  response.data.token);
					axios.defaults.headers.common['Authorization'] =  response.data.token;
					commit('auth_success',  response.data.token, response.data.user);
					resolve(response);
				}).catch(error => {
					commit('auth_error');
					localStorage.removeItem('token');
					reject(error);
				})
			})
		}
	},
	getters: {
		isLoggedIn(state) {
			return !!state.token;
		},
		authStatus(state) {
			return state.status;
		}
	}
})

export default store;