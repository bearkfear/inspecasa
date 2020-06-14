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
							<td width="10%">
								<div class="buttons">
									<b-button
										type="is-info"
										tag="router-link"
										:to="{path: `/show/imovel/${imovel.id}`}"
										icon-left="eye"
										size="is-small"
									></b-button>
									<b-button
										type="is-info"
										icon-left="edit"
										size="is-small"
										@click="handleEditar(imovel)"
									></b-button>
									<b-button
										type="is-danger"
										icon-left="trash"
										size="is-small"
										@click="handleRemover(imovel)"
									></b-button>
								</div>
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
		handleRemover(imovel: any) {
			this.$buefy.dialog.confirm({
				title: "Remover Imovel",
				message: "Deseja <b>remover</b> o imovel? Essa ação não pode ser desfeita.",
				confirmText: "Remover",
				type: "is-danger",
				hasIcon: true,
				onConfirm: () => {
					this.$apollo
						.mutate({
							mutation: gql`
								mutation deleteImovel($id: ID!) {
									deleteImovel(id: $id)
								}
							`,
							variables: {
								id: imovel.id
							}
						})
						.then(() => {
							this.$apollo.queries.imoveis.refetch();
						});
				}
			});
		},
		handleAdicionar() {
			this.$buefy.modal.open({
				parent: this,
				hasModalCard: true,
				component: ModalImovel,
				props: {},
				events: {
					reload: () => {
						this.$apollo.queries.imoveis.refetch();
					}
				}
			});
		},
		handleEditar(imovel: any) {
			this.$buefy.modal.open({
				parent: this,
				hasModalCard: true,
				component: ModalImovel,
				props: {
					isEditing: true,
					idImovel: imovel.id,
					idEndereco: imovel.endereco.id
				},
				events: {
					reload: () => {
						this.$apollo.queries.imoveis.refetch();
					}
				}
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
					endereco {
						id
					}
				}
			}
		`
	}
});
</script>
