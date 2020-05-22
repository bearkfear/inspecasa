<template>
	<div>
		<Navbar></Navbar>
		<section class="section">
			<div class="container">
				<div class="level">
					<div class="level-left">
						<h1 class="title is-4">Clientes</h1>
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
						<tr v-for="cliente in clientes" :key="cliente.uid">
							<th>{{ cliente.nome }}</th>
							<td>{{ cliente.sobrenome }}</td>
							<td>{{ cliente.email }}</td>
							<td>{{ cliente.dataCriacao }}</td>
							<td>{{ cliente.ultimoAcesso }}</td>
							<td>{{ cliente.bio }}</td>
							<td>
								<b-button icon-left="trash" type="is-warning" size="is-small"></b-button>
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

import Navbar from "@/components/Navbar.vue";
import gql from "graphql-tag";

export default Vue.extend({
	name: "cliente",
	components: {
		Navbar
	},
	data: () => ({
		clientes: [],
	}),
	apollo: {
		clientes: gql`
			query clientes {
				clientes {
					uid
					nome
					sobrenome
					email
					dataCriacao
					ultimoAcesso
					bio
				}
			}
		`
	}
});
</script>
