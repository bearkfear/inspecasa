<template>
	<div class="modal-card">
		<header class="modal-card-head">
			<div>
				<h1 class="modal-card-title">{{ isEditing ? "Editar" : "Adicionar" }} Usuario</h1>
				<p>Preencha as informações sobre o Usuario</p>
			</div>
		</header>
		<section class="modal-card-body">
			<div>
				<div class="media">
					<div class="media-left">
						<b-field class="file" :disabled="loading">
							<b-upload
								v-model="file"
								accept="image/*"
								@input="selectImage"
								drag-drop
								:disabled="isUploading"
							>
								<b-skeleton animated width="128" height="128" v-if="loading"></b-skeleton>
								<figure v-else class="image is-128x128">
									<img :src="reader ? reader : usuario.urlImg" />
								</figure>
							</b-upload>
						</b-field>
						<div class="buttons" v-if="reader && !isUploading">
							<b-button
								@click="saveFoto"
								icon-left="upload"
								type="is-success"
								size="is-small"
							></b-button>
							<b-button
								@click="removeFoto"
								icon-left="trash"
								type="is-danger"
								size="is-small"
							></b-button>
						</div>
						<b-progress
							:value="progress"
							show-value
							format="percent"
							v-if="isUploading"
							type="is-success"
						>
						</b-progress>
					</div>
					<div class="media-right">
						<b-field label="Nome">
							<b-input placeholder="Nome" v-model="usuario.nome"> </b-input>
						</b-field>
						<b-field label="Sobrenome">
							<b-input placeholder="Sobrenome" v-model="usuario.sobrenome"> </b-input>
						</b-field>
					</div>
				</div>

				<b-field label="E-mail">
					<b-input type="email" placeholder="example@inspecasa.site" v-model="usuario.email">
					</b-input>
				</b-field>
				<b-field label="Função">
					<b-input type="text" placeholder="Cargo ou função" v-model="usuario.funcao"> </b-input>
				</b-field>
				<b-field label="Biografia">
					<b-input
						type="text"
						placeholder="Tomo um café antes de fechar um negócio"
						v-model="usuario.bio"
					>
					</b-input>
				</b-field>
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
				<b-button v-else type="is-success" :loading="isSubmitting" :disabled="isSubmitting">
					Salvar
				</b-button>
			</div>
		</footer>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase";
import { GET_USER, UPDATE_USER } from "@/queries";
import uuid from "uuid-random";
import { Usuario } from "@/types";

interface Data {
	usuario: null | Usuario;
	loading: boolean;
	file: File | null;
	reader: string | ArrayBuffer | null;
	progress: number;
	isUploading: boolean;
}
// Data, Methods, Computed, Props
export default Vue.extend({
	name: "UsuarioForm",
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
		}
	},
	data: (): Data => ({
		usuario: null,
		file: null,
		isUploading: false,
		progress: 0,
		reader: null,
		loading: false
	}),
	methods: {
		saveFoto() {
			const { file } = this;
			if (file !== null) {
				this.isUploading = true;
				const storage = firebase.storage().ref();
				const uploadTask = storage.child(`profile_images/${uuid()}`).put(file);

				uploadTask.on(
					"state_changed",
					snapshot => {
						this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					},
					error => {
						console.error(error);
						this.file = null;
						this.reader = null;
					},
					async () => {
						const downloadUrl = String(await uploadTask.snapshot.ref.getDownloadURL());
						if (downloadUrl && this.usuario) {
							await this.updateUserImage(downloadUrl);
							this.usuario.urlImg = downloadUrl;
							this.isUploading = false;
							this.progress = 0;
							this.reader = null;
							this.file = null;
						}
					}
				);
			}
		},
		updateUserImage(url: string) {
			return this.$apollo.mutate({
				mutation: UPDATE_USER,
				variables: {
					id: this.usuario?.id,
					usuario: {
						urlImg: url
					}
				}
			});
		},
		removeFoto() {
			this.file = null;
			this.reader = null;
		},
		selectImage(image: File) {
			console.log(image);
			const reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onload = event => {
				this.reader = event?.target?.result || null;
			};
		}
	},
	created() {
		this.usuario = {
			urlImg:
				"https://firebasestorage.googleapis.com/v0/b/inspecasa.appspot.com/o/user-placeholder.jpeg?alt=media&token=81babb0c-d997-4e6a-a4f0-81c153db94ea",
			nome: null,
			sobrenome: null,
			funcao: null,
			email: null,
			bio: null
		};
	}
});
</script>
