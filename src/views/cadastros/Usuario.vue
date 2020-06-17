<template>
	<div>
		<section class="section">
			<div class="container">
				<div class="level">
					<div class="level-left">
						<h1 class="title is-3">Usuarios</h1>
					</div>
					<div class="level-rigth">
						<b-button icon-left="plus" type="is-primary">Criar novo</b-button>
					</div>
				</div>
				<table class="table is-striped is-hoverable is-fullwidth">
					<thead>
						<tr>
							<th>Nome</th>
							<th>Sobrenome</th>
							<th>Email</th>
							<th>Bio</th>
							<th>Função</th>
							<th>Data Criação</th>
							<th>Ultimo Acesso</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						<template v-if="loading">
							<tr v-for="(skl, i) in 10" :key="i">
								<th v-for="(skll, inx) in 8" :key="inx">
									<b-skeleton active animated width="100px"></b-skeleton>
								</th>
							</tr>
						</template>
						<tr v-for="usuario in usuarios" :key="usuario.id">
							<th>{{ usuario.nome }}</th>
							<td>{{ usuario.sobrenome }}</td>
							<td>{{ usuario.email }}</td>
							<td>{{ usuario.bio }}</td>
							<td>{{ usuario.funcao }}</td>
							<td>{{ new Date(Number(usuario.createdAt)).toLocaleString() }}</td>
							<td>{{ new Date(Number(usuario.changedAt)).toLocaleString() }}</td>
							<td class="buttons">
								<b-button
									icon-left="eye"
									type="is-info"
									tag="router-link"
									:to="{ path: `/show/usuario/${usuario.id}` }"
								></b-button>
								<b-button icon-left="trash" type="is-danger"></b-button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

import gql from "graphql-tag";

export default Vue.extend({
	name: "usuario",
	data: () => ({
		usuarios: [],
		loading: false
	}),
	methods: {
		fetchUsuarios() {
			this.$apollo
				.query({
					query: gql`
						{
							usuarios {
								id
								nome
								sobrenome
								funcao
								email
								bio
								uid
								createdAt
								changedAt
								urlImg
							}
						}
					`
				})
				.then(({ data }) => {
					this.loading = false;
					this.usuarios = data.usuarios;
				});
		}
	},
	created() {
		this.loading = true;
		this.fetchUsuarios();
	}
});
</script>
