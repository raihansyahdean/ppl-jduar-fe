<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
  name: 'App',
  components: {
    HelloWorld,
	ReadyPage,
	Camera
  }
}
</script>

<style>
@import './assets/css/general.css';
</style>
