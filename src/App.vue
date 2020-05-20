<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	data: () => ({
		today: "one"
	})
});
</script>

<style lang="scss">
@import "@/styles/_global.scss";
</style>
