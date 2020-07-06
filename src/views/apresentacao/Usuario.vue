<template>
	<div>
		<section class="section">
			<div class="container">
				<div class="level">
					<div class="level-left">
						<h1 class="title is-3">
							<router-link to="/cadastro/usuario">Usuarios</router-link> / Visualizar
						</h1>
					</div>
				</div>
				<hr />
				<div class="columns is-multiline">
					<article class="column is-6">
						<div>
							<h1 class="title is-4">Informações</h1>
							<div>
								<code>
									{{ JSON.stringify(usuario, null, 4)}}
								</code>
							</div>
						</div>
					</article>
					<article class="column is-6">
						<div class="block">
							<h1 class="title is-4">Vendas</h1>
						</div>
					</article>
				</div>
			</div>
		</section>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import { GET_USER } from "@/queries";

export default Vue.extend({
	name: "VisualizarUsuario",
	data: () => ({
		usuario: null,
		loading: false
	}),
	methods: {
		fetchUser() {
			this.loading = true;
			this.$apollo
				.query({
					query: GET_USER,
					variables: {
						id: this.$route.params.id
					}
				})
				.then(({ data }) => {
					this.usuario = data.usuario;
					this.loading = false;
				});
		}
	},
	created() {
		this.fetchUser();
	}
});
</script>
