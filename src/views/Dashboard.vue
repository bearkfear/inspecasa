<template>
	<div>
		<Navbar></Navbar>
		<h1>Ola mundo essa e a tela inicial</h1>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";

export default Vue.extend({
	components: {
		Navbar
	}
});
</script>
