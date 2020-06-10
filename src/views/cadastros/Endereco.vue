<template>
	<div>
		<Navbar></Navbar>
		<section class="section">
			<div class="container">
				<div class="level">
					<div class="level-left">
						<h1 class="title is-3">Endereços</h1>
					</div>
					<div class="level-rigth">
						<b-button icon-left="plus" type="is-primary">Criar novo</b-button>
					</div>
				</div>
				<table class="table is-striped is-hoverable is-fullwidth">
					<thead>
						<tr>
							<th>Rua</th>
							<th>Número</th>
							<th>Complemento</th>
							<th>Bairro</th>
							<th>Cidade</th>
							<th>UF</th>
							<th>CEP</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="endereco in enderecos" :key="endereco.id">
							<td>{{ endereco.rua }}</td>
							<td>{{ endereco.numero }}</td>
							<td>{{ endereco.complemento }}</td>
							<td>{{ endereco.bairro }}</td>
							<td>{{ endereco.cidade }}</td>
							<td>{{ endereco.uf }}</td>
							<td>{{ endereco.cep | VMask("#####-###") }}</td>
							<td>
								<b-button type="is-info" icon-left="edit" size="is-small"></b-button>
								<b-button type="is-danger" icon-left="trash" size="is-small"></b-button>
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
import VMask from "v-mask";

import Navbar from "@/components/Navbar.vue";
import gql from "graphql-tag";

export default Vue.extend({
	name: "endereco",
	components: {
		Navbar
	},
	apollo: {
		enderecos: gql`
			query enderecos {
				enderecos {
					id
					rua
					logradouro
					complemento
					numero
					uf
					cep
					avenida
					cidade
					bairro
				}
			}
		`
	}
});
</script>
