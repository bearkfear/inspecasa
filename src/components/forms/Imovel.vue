<template>
	<div style="width: auto">
		<div class="modal-card">
			<header class="modal-card-head">
				<p clas="modal-card-title">Adicionar Imóvel</p>
			</header>
			<section class="modal-card-body">
				<h3 class="title is-4">Geral</h3>
				<p>Preencha as informações gerais sobre o imóvel</p>
				<p></p>
				<hr />
				<div>
					<b-field label="Descrição">
						<input
							class="input"
							v-model="imovel.descricao"
							type="text"
							placeholder="Digite uma descrição para o imóvel"
						/>
					</b-field>

					<b-field label="Valor Proposto">
						<input
							class="input"
							v-model="imovel.valorProposta"
							type="text"
							placeholder="Qual o valor pretendido para venda"
							v-money="{
								decimal: ',',
								thousands: '.',
								prefix: 'R$ ',
								precision: 2,
								masked: false
							}"
						/>
					</b-field>

					<b-field label="Categoria">
						<b-select
							v-model.number="imovel.categoria"
							placeholder="Selecione uma categoria de imóvel"
						>
							<option value="0"
								>Apartamento padrão: sala de estar, sala de jantar, cozinha, quartos,
								banheiros</option
							>
							<option value="1"
								>Kitnet: banheiro e cômodo com quarto cozinha e sala sem divisórias</option
							>
							<option value="2"
								>Loft: apartamento maior e mais amplos, sem divisórias, com o pé direito mais alto e
								com grandes janelas e muitas vezes com mezaninos instalados no ambiente</option
							>
							<option value="3">Duplex: apartamento com dois andares</option>
							<option value="4">Triplex: apartamento com tres andares</option>
							<option value="5">Casa: imóvel com cozinha, sala, área, banheiro e quarto</option>
						</b-select>
					</b-field>

					<b-field label="Quantos quartos">
						<b-numberinput v-model="imovel.numQuartos"></b-numberinput>
					</b-field>
					<br />
					<br />
					<h3 class="title is-4">Endereço</h3>
					<p>Informe o endereço</p>
					<hr />
					<b-field label="CEP">
						<input
							class="input"
							v-model="endereco.cep"
							v-mask="'#####-###'"
							placeholder="Digite o seu CEP"
							@input="handleCep(endereco.cep)"
						/>
					</b-field>
					<b-field label="Rua">
						<b-input type="text" v-model="endereco.rua" placeholder="Nome da rua"> </b-input>
					</b-field>
					<b-field label="Cidade">
						<b-input type="text" v-model="endereco.cidade" placeholder="Nome da Municipio">
						</b-input>
					</b-field>

					<b-field label="UF">
						<b-input type="text" v-model="endereco.uf" maxlength="2"> </b-input>
					</b-field>
					<b-field label="Bairro">
						<b-input v-model="endereco.bairro" placeholder="Nome do bairro"></b-input>
					</b-field>
					<b-field label="Complemento">
						<b-input type="text" v-model="endereco.complemento" placeholder="Complemento">
						</b-input>
					</b-field>
					<b-field label="Número">
						<b-input placeholder="Número da casa" type="text" v-model="endereco.numero"></b-input>
					</b-field>
				</div>
			</section>
			<footer class="modal-card-foot">
				<div class="container">
					<b-button @click="$emit('close')">
						Fechar
					</b-button>
					<b-button type="is-success" @change="handleStoreImovel()">
						Adicionar
					</b-button>
				</div>
			</footer>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import { debounce } from "lodash";
import axios from "axios";

interface ViaCep {
	cep: string;
	logradouro: string;
	complemento: string;
	bairro: string;
	localidade: string;
	uf: string;
	unidade: string;
	ibge: string;
	gia: string;
}

interface Endereco {
	rua: string | null;
	logradouro?: string | null;
	complemento?: string | null;
	numero: number | null;
	uf: string | null;
	cep: string;
	avenida: string | null;
	cidade: string | null;
	bairro: string | null;
}

interface Data {
	imovel: {
		descricao: string | null;
		valorProposta: string | null;
		categoria: number | null;
		numQuartos: number | null;
		situacao: number | null;
	};
	endereco: Endereco;
	isSubmitting: boolean;
	isLoading: boolean;
}
// Data, Methods, Computed, Props
export default Vue.extend({
	data: (): Data => ({
		imovel: {
			descricao: null,
			valorProposta: null,
			categoria: null,
			numQuartos: 0,
			situacao: 1
		},
		endereco: {
			cep: "",
			rua: null,
			logradouro: null,
			complemento: null,
			numero: null,
			uf: null,
			avenida: null,
			cidade: null,
			bairro: null
		},
		isSubmitting: false,
		isLoading: false
	}),
	methods: {
		handleStoreImovel() {
			console.log(this.imovel);
		},
		handleCep(cep: string) {
			if (cep && cep.length === 9) {
				const localCep = cep.replace("-", "");

				axios
					.get<ViaCep>(`https://viacep.com.br/ws/${localCep}/json/`, {
						headers: {
							Accept: [
								"text/html",
								"application/xhtml+xml",
								"application/xml;q=0.9",
								"image/webp",
								"image/apng",
								"*/*;q=0.8",
								"application/signed-exchange;v=b3;q=0.9"
							]
						}
					})
					.then(({ data }) => {
						console.log(data);

						const { logradouro, complemento, bairro, localidade, uf } = data;

						this.endereco.rua = logradouro;
						this.endereco.uf = uf;
						this.endereco.logradouro = logradouro;
						this.endereco.complemento = complemento;
						this.endereco.bairro = bairro;
						this.endereco.cidade = localidade;
					});
			}
		}
	}
});
</script>
