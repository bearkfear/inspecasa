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
				<div class="columns is-multiline">
					<article class="column is-6">
						<div class="box">
							<h1 class="title is-4">Sobre</h1>
							<hr />
							<div class="media">
								<div class="media-left">
									<figure class="image is-128x128">
										<img :src="usuario.urlImg" class="is-rounded" />
									</figure>
									<b-field class="file">
										<b-upload v-model="file">
											<a class="button is-twitter is-small">
												<b-icon icon="upload"></b-icon>
												<span>Click to upload</span>
											</a>
										</b-upload>
										<span class="file-name" v-if="file">
											{{ file.name }}
										</span>
									</b-field>
								</div>
								<div class="media-content">
									<h1 class="title is-5">
										{{ usuario.nome }} {{ usuario.sobrenome }} ({{ usuario.email }})
									</h1>

									<p><strong>Função:</strong> {{ usuario.funcao }}</p>
									<p><strong>Bio:</strong> {{ usuario.bio }}</p>
									<p>
										<strong>Primeiro Acesso:</strong>
										{{ new Date(Number(usuario.createdAt)).toLocaleString() }}
									</p>
									<p>
										<strong>Ultimo Acesso:</strong>
										{{ new Date(Number(usuario.changedAt)).toLocaleString() }}
									</p>
								</div>
							</div>
						</div>
					</article>
					<article class="column is-6">
						<div class="box">
							<h1 class="title is-4">Vendas</h1>
							<hr />
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
		loading: false,
		file: null
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
