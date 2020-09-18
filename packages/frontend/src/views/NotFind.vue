<template lang="pug">

	section.section
		div.columns
			.column

			.column
				.has-text-centered

					img.has-text-centered(
						src="~@/assets/logo.svg",
						width="200"
						height="200"
					)
				br
				h1.title.has-text-centered 404, página não encontrada 😫

				ul
					li
						router-link(to="/auth") Acessar sistema
					li
						router-link(to="/") Ir para tela inicial

			.column

</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>
