<template lang="pug">
	section.section
		.container
			h1.title.is-2 Estatísticas
			hr
			.columns
				.column.is-3
					.box.py-6.px-6.has-background-twitter
						h3.subtitle.is-5.has-text-weight-bold.has-text-light Total Vendido
						h1.title.is-4.has-text-white R$ 4300.000
				.column.is-3
					.box.py-6.px-6.has-background-primary
						h3.subtitle.is-5.has-text-weight-bold.has-text-light Imóveis Vendidos
						h1.title.is-4.has-text-white 35
				.column.is-3
					.box.py-6.px-6.has-background-warning
						h3.subtitle.is-5.has-text-weight-bold.has-text-light Valor Vendido
						h1.title.is-4.has-text-white R$ 4300.000
				.column.is-3
					.box.py-6.px-6.has-background-success
						h3.subtitle.is-5.has-text-weight-bold.has-text-light Inspeções Feitas
						h1.title.is-4.has-text-white 30
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { gsap, Back } from "gsap"

@Component
export default class Dashboard extends Vue { 

	mounted() { 
		this.$router.push("/cadastro/imovel")
		// gsap.from('.box', { 
		// 	y: 10,
		// 	stagger: 0.5,
		// 	ease: Back.easeOut
		// })

	}

}
</script>
