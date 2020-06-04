<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
/* istanbul ignore next */
import axios from 'axios'

export default {
	name: 'App',
	data () {
		return {}
	},
	created: function() {
		axios.interceptors.response.use(undefined, function(error) {
			return new Promise(function () {
				if (error.status == 401 && error.config && !error.config.__isRetryRequest) {
					this.$store.dispatch('logout');
				}
				throw error;
			})
		})		
	}
}
</script>

<style>
@import './assets/css/general.css';
</style>
