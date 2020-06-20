<template>
	<div>
		<section class="section">
			<div class="container">
				<div class="level">
					<div class="level-left">
						<h1 class="title is-3">Visualizar</h1>
					</div>
					<div class="level-rigth buttons">
						<b-button icon-left="history" type="is-info">Historico</b-button>
						<b-button icon-left="handshake" type="is-success">Vender</b-button>
					</div>
				</div>
				<hr />
				<div class="columns is-multiline">
					<article class="column is-6">
						<div>
							<h1 class="title is-4">Informações</h1>
							<p>
								<strong>Preço: </strong>
								<span v-if="!loading">{{ imovel.valorProposta }}</span>
								<b-skeleton v-else active animated width="50px"></b-skeleton>
							</p>
							<p>
								<strong>Quartos: </strong>
								<span v-if="!loading">{{ imovel.numQuartos }}</span>
								<b-skeleton v-else animated active width="50px"></b-skeleton>
							</p>
							<p>
								<strong>Categoria: </strong>
								<span v-if="!loading">{{ imovel.categoria }}</span>
								<b-skeleton v-else animated active width="50px"></b-skeleton>
							</p>
							<strong>Descrição: </strong>
							<p v-if="!loading" v-html="imovel.descricao"></p>
							<b-skeleton v-else animated active width="50px"></b-skeleton>

							<p>
								<strong>Endereço: </strong>
							</p>
							<p v-if="!loading">
								{{ imovel.endereco.cidade }}/{{ imovel.endereco.uf }} -
								{{ imovel.endereco.bairro }} - {{ imovel.endereco.logradouro }} -
								{{ imovel.endereco.numero }} - {{ imovel.endereco.complemento }} -
								{{ imovel.endereco.cep }}
							</p>
							<b-skeleton v-else animated active width="100"></b-skeleton>
						</div>
					</article>
					<article class="column is-6">
						<div class="block">
							<h1 class="title is-4">Proprietário(s)</h1>
						</div>
					</article>
				</div>
				<footer>
					<b-tabs v-model="activeTab" expanded type="is-toggle">
						<b-tab-item label="Vistorias" icon="bug">
							<div class="level">
								<div class="level-left"></div>
								<div class="level-right">
									<b-button type="is-primary" icon-left="plus">Criar novo</b-button>
								</div>
							</div>
							<div class="box content">
								<div class="title is-4">Vistoria</div>
							</div>
						</b-tab-item>
						<b-tab-item label="Documentos" icon="file-alt">
							<section>
								<b-field>
									<b-upload v-model="documentosUpload" multiple drag-drop expanded>
										<div class="content has-text-centered">
											<p>
												<b-icon icon="upload" size="is-medium"> </b-icon>
											</p>
											<p>Solte seus arquivos aqui ou clique para selecionar</p>
										</div>
									</b-upload>
								</b-field>
							</section>
						</b-tab-item>
						<b-tab-item label="Mídias" icon="video">
							<b-field>
								<b-upload v-model="midiasUpload" multiple drag-drop expanded>
									<div class="content has-text-centered">
										<p>
											<b-icon icon="upload" size="is-medium"> </b-icon>
										</p>
										<p>Solte seus arquivos aqui ou clique para selecionar</p>
									</div>
								</b-upload>
							</b-field>
						</b-tab-item>
					</b-tabs>
				</footer>
			</div>
		</section>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import { GET_IMOVEL } from "@/queries";

export default Vue.extend({
	name: "VisualizarImovel",
	data: () => ({
		activeTab: 0,
		midiasUpload: [],
		documentosUpload: [],
		imovel: null,
		loading: false
	}),
	methods: {
		fetchImovel() {
			this.loading = true;
			this.$apollo
				.query({
					query: GET_IMOVEL,
					variables: {
						id: this.$route.params.id
					}
				})
				.then(({ data }) => {
					this.imovel = data.imovel;
					this.loading = false;
				});
		}
	},
	created() {
		this.fetchImovel();
	}
});
</script>
