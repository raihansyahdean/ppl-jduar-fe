<template>
	<div class="hello">
		<h1>Hello World</h1>
		<img alt="Vue logo" src="./../assets/logo.png">
		<p> We'll come very soon... </p>
		<p>code with ❤ by JDUAR NVIDIA</p>
	</div>
</template>

<script>
export default {
	beforeCreate: function() {
        document.body.className = 'white';
    },
	name: 'HelloWorld',
}
</script>

<style>
.hello {
	text-align: center;
	color: #2c3e50;
	margin-top: 100px;
}
</style>

