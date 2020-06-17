<template>
	<div>
		<section class="section">
			<div class="container">
				<div class="level">
					<div class="level-left">
						<h1 class="title is-3">Clientes</h1>
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
							<th>Data Criação</th>
							<th>Ultimo Acesso</th>
							<th>Bio</th>
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
						<tr v-for="cliente in clientes" :key="cliente.id">
							<th>{{ cliente.nome }}</th>
							<td>{{ cliente.sobrenome }}</td>
							<td>{{ cliente.email }}</td>
							<td>{{ new Date(cliente.createdAt).toLocaleString() }}</td>
							<td>{{ new Date(cliente.changedAt).toLocaleString() }}</td>
							<td>{{ cliente.bio }}</td>
							<td class="buttons">
								<b-button
									icon-left="eye"
									type="is-info"
									tag="router-link"
									size="is-small"
									:to="{ path: `/show/cliente/${cliente.id}` }"
								></b-button>
								<b-button icon-left="trash" type="is-danger" size="is-small"></b-button>
							</td>
						</tr>
					</tbody>
				</table>
				<template v-if="!loading && clientes.length === 0">
					<section class="section">
						<div class="content has-text-grey has-text-centered">
							<p>
								<b-icon icon="frown-open" size="is-large"> </b-icon>
							</p>
							<p>Sem Registros. Crie um!</p>
						</div>
					</section>
				</template>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

import gql from "graphql-tag";

export default Vue.extend({
	name: "cliente",
	data: () => ({
		clientes: [],
		loading: false
	}),
	methods: {
		fetchClientes() {
			this.loading = true;
			this.$apollo
				.query({
					query: gql`
						query clientes {
							clientes {
								id
								nome
								sobrenome
								email
								createdAt
								changedAt
								bio
							}
						}
					`
				})
				.then(({ data }) => {
					this.clientes = data.clientes;
				})
				.finally(() => {
					this.loading = false;
				});
		}
	},
	created() {
		this.fetchClientes();
	}
});
</script>
