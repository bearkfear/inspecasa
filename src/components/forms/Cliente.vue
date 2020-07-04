<template>
	<div class="modal-card">
		<header class="modal-card-head">
			<div>
				<h1 class="modal-card-title">{{ isEditing ? "Editar" : "Adicionar" }} Cliente</h1>
				<p>Preencha as informações sobre o Cliente</p>
			</div>
		</header>
		<section class="modal-card-body">
			<div>

			</div>
		</section>
		<footer class="modal-card-foot ">
			<div class="is-pulled-right">
				<b-button @click="$emit('close')">
					Fechar
				</b-button>

				<b-button
					v-if="!isEditing"
					type="is-success"
					:loading="isSubmitting"
					:disabled="isSubmitting"
				>
					Adicionar
				</b-button>
				<b-button
					v-else
					type="is-success"
					:loading="isSubmitting"
					:disabled="isSubmitting"
				>
					Salvar
				</b-button>
			</div>
		</footer>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import gql from "graphql-tag";
import Multiselect from "vue-multiselect";
// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import CKEDITOR_CONFIG from "@/constants";
import {
} from "@/queries";
import { ViaCep, Endereco } from "@/types";
import cleanMoney from "@/utils/cleanMoney";

interface Data {

}
// Data, Methods, Computed, Props
export default Vue.extend({
	props: {
		isEditing: {
			required: false,
			default: false,
			type: Boolean
		},
		idCLiente: {
			required: false,
			default: "0",
			type: String
		},
	},
	data: (): Data => ({
		editor: ClassicEditor,
		config: CKEDITOR_CONFIG,
		isSubmitting: false,
		isLoading: false,
		loading: {
			clientes: false,
			loadingCep: false
		}
	}),
	components: {
		Multiselect
	},
	methods: {
	}
});
</script>

<style lang="scss" scoped>
@import "~vue-multiselect/dist/vue-multiselect.min.css";
</style>
