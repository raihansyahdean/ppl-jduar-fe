<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
  name: 'App',

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

body.white {
	background-color: #ffffff;
}

body.black {
	background-color: #000000;
}

#app {
	font-family: 'Lato';
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
