<template>
	<div>
		<Navbar></Navbar>
		<section class="section">
			<div class="container">
				<div class="level">
					<div class="level-left">
						<h1 class="title is-3">Imóveis</h1>
					</div>
					<div class="level-rigth">
						<b-button icon-left="plus" type="is-primary">Criar novo</b-button>
					</div>
				</div>
				<table class="table is-striped is-hoverable is-fullwidth">
					<thead>
						<tr>
							<th>Categoria</th>
							<th>Descrição</th>
							<th>Quartos</th>
							<th>Situação</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="imovel in imoveis" :key="imovel.uid">
							<td>{{ imovel.categoria }}</td>
							<td>{{ imovel.descricao }}</td>
							<td>{{ imovel.numQuartos }}</td>
							<td>{{ imovel.situacao }}</td>
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
import gql from "graphql-tag";
import Navbar from "@/components/Navbar.vue";

export default Vue.extend({
	name: "imovel",
	components: {
		Navbar
	},
	apollo: {
		imoveis: gql`
			query imoveis {
				imoveis {
					uid
					categoria
					descricao
					numQuartos
					situacao
					valorProposta
				}
			}
		`
	}
});
</script>
