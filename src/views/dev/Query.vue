<template>
	<div>
		<Navbar></Navbar>
		<section class="section">
			<div class="container">
				<div class="level">
					<div class="level-left">
						<h1 class="title is-3">DEV AREA</h1>
					</div>
					<div class="level-rigth">
						<b-button icon-left="plus" type="is-primary">Consultar</b-button>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "../../components/Navbar.vue";

export default Vue.extend({
	components: {
		Navbar
	}
});
</script>
