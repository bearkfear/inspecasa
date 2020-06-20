<template>
	<div>
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
						<template v-if="loading">
							<tr v-for="(skl, i) in 10" :key="i">
								<th v-for="(skll, inx) in 5" :key="inx">
									<b-skeleton active animated width="100px"></b-skeleton>
								</th>
							</tr>
						</template>
						<tr v-for="imovel in imoveis" :key="imovel.id">
							<td>{{ imovel.categoria | categoria }}</td>
							<td><div v-html="imovel.descricao"></div></td>
							<td>{{ imovel.numQuartos }}</td>
							<td>{{ imovel.situacao | situacao }}</td>
							<td width="10%">
								<div class="buttons">
									<b-button
										type="is-info"
										tag="router-link"
										:to="{ path: `/show/imovel/${imovel.id}` }"
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
				<template v-if="!loading && imoveis.length <= 0">
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
import ModalImovel from "@/components/forms/Imovel.vue";

export default Vue.extend({
	name: "imovel",
	data: () => ({
		imoveis: [],
		loading: false
	}),
	filters: {
		situacao(val: number) {
			if (val === 1) {
				return "A Venda";
			}
			return "Vendido";
		},
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
							this.fetchImoveis();
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
				fullScreen: true,
				events: {
					reload: () => {
						this.fetchImoveis();
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
						this.fetchImoveis();
					}
				}
			});
		},
		fetchImoveis() {
			this.$apollo
				.query({
					query: gql`
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
				})
				.then(({ data }) => {
					this.imoveis = data.imoveis;
				})
				.finally(() => {
					this.loading = false;
				});
		}
	},
	created() {
		this.loading = true;
		this.fetchImoveis();
	}
});
</script>
