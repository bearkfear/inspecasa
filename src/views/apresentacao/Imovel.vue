<template>
	<div>
		<Navbar></Navbar>
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
				<div class="columns is-multiline">
					<article class="column is-6">
						<div class="block">
							<h1 class="title is-4">Informações</h1>
							{{
								imovel
							}}
						</div>
					</article>
					<article class="column is-6">
						<div class="block">
							<h1 class="title is-4">Proprietário(s)</h1>
						</div>
					</article>
				</div>
				<footer>
					<b-tabs v-model="activeTab" expanded>
						<b-tab-item label="Vistorias">
							<div class="level">
								<div class="level-left"></div>
								<div class="level-right">
									<b-button type="is-info" icon-left="plus">Criar</b-button>
								</div>
							</div>
							<div class="notification">
								<div class="title">Vistoria</div>
							</div>
						</b-tab-item>
						<b-tab-item label="Documentos">
							<section>
								<b-field>
									<b-upload v-model="documentosUpload" multiple drag-drop expanded>
										<section class="section">
											<div class="content has-text-centered">
												<p>
													<b-icon icon="upload" size="is-large"> </b-icon>
												</p>
												<p>Solte seus arquivos aqui ou clique para selecionar</p>
											</div>
										</section>
									</b-upload>
								</b-field>
							</section>
						</b-tab-item>
						<b-tab-item label="Mídias">
							<b-field>
								<b-upload v-model="midiasUpload" multiple drag-drop expanded>
									<section class="section">
										<div class="content has-text-centered">
											<p>
												<b-icon icon="upload" size="is-large"> </b-icon>
											</p>
											<p>Solte seus arquivos aqui ou clique para selecionar</p>
										</div>
									</section>
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
import Navbar from "@/components/Navbar.vue";
import gql from "graphql-tag";

export default Vue.extend({
	name: "VisualizarImovel",
	data: () => ({
		activeTab: 0,
		midiasUpload: [],
		documentosUpload: [],
		imovel: {}
	}),
	components: {
		Navbar
	},
	apollo: {
		imovel: gql`
			query imovel($id: ID!) {
				imovel(id: $id) {
					id
					categoria
					descricao
					numQuartos
					valorProposta
					updatedAt
					endereco {
						id
						avenida
						bairro
						cep
						cidade
						complemento
						logradouro
						uf
						updatedAt
					}
				}
			}
		`
	}
});
</script>
