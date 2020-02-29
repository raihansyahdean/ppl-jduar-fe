<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>
import HelloWorld from './components/HelloWorld.vue'
import ReadyPage from './components/ReadyPage.vue'
import Camera from './components/Camera.vue'

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
