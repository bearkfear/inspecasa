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
						<b-button icon-left="plus" type="is-primary" @click="handleAdicionar()"
							>Criar novo</b-button
						>
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
						<tr v-for="imovel in imoveis" :key="imovel.id">
							<td>{{ imovel.categoria | categoria }}</td>
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
import ModalImovel from "@/components/forms/Imovel.vue";

export default Vue.extend({
	name: "imovel",
	components: {
		Navbar
	},
	methods: {
		handleAdicionar() {
			this.$buefy.modal.open({
				parent: this,
				hasModalCard: true,
				component: ModalImovel,
				props: {},
				events: {}
			});
		}
	},
	filters: {
		categoria(key: number) {
			enum Categoria {
				Apartamento,
				Kitnet,
				Loft,
				Duplex,
				Triplex,
				Casa
			}
			return Categoria[key];
		}
	},
	apollo: {
		imoveis: gql`
			query imoveis {
				imoveis {
					id
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
