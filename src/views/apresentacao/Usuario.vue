<template>
	<div>
		<section class="section">
			<div class="container">
				<div class="level">
					<div class="level-left">
						<h1 class="title is-3">
							<router-link to="/cadastro/usuario">Usuarios</router-link> / Visualizar
						</h1>
					</div>
				</div>
				<div class="columns is-multiline">
					<article class="column is-6">
						<div class="box">
							<h1 class="title is-4">Sobre</h1>
							<hr />
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
								<div class="media-content">
									<b-skeleton animated width="128" v-if="loading"></b-skeleton>
									<h1 class="title is-5" v-else>
										{{ usuario.nome }} {{ usuario.sobrenome }} ({{ usuario.email }})
									</h1>

									<p>
										<strong>Função:</strong>
										<b-skeleton animated width="128" v-if="loading"></b-skeleton>
										<span v-else> {{ usuario.funcao }}</span>
									</p>
									<p>
										<strong>Bio:</strong>
										<b-skeleton animated width="128" v-if="loading"></b-skeleton
										><span v-else>{{ usuario.bio }}</span>
									</p>
									<p>
										<strong>Primeiro Acesso:</strong>
										<b-skeleton animated width="128" v-if="loading"></b-skeleton>
										<span v-else>
											{{ new Date(Number(usuario.createdAt)).toLocaleString() }}
										</span>
									</p>
									<p>
										<strong>Ultimo Acesso:</strong>
										<b-skeleton animated width="128" v-if="loading"></b-skeleton>
										<span v-else>
											{{ new Date(Number(usuario.changedAt)).toLocaleString() }}
										</span>
									</p>
								</div>
							</div>
						</div>
					</article>
					<article class="column is-6">
						<div class="box">
							<h1 class="title is-4">Vendas</h1>
							<hr />
						</div>
					</article>
				</div>
			</div>
		</section>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import firebase from "firebase";
import { GET_USER, UPDATE_USER } from "@/queries";
import uuid from "uuid-random";

interface Usuario {
	id: number;
	nome: string;
	sobrenome: string;
	funcao: string;
	email: string;
	bio: string;
	uid: string;
	createdAt: string;
	changedAt: string;
	urlImg: string;
}

interface Data {
	usuario: null | Usuario;
	loading: boolean;
	file: File | null;
	reader: string | ArrayBuffer | null;
	progress: number;
	isUploading: boolean;
}

export default Vue.extend({
	name: "VisualizarUsuario",
	data: (): Data => ({
		usuario: null,
		loading: false,
		file: null,
		reader: null,
		progress: 0,
		isUploading: false
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
		},
		fetchUser() {
			this.loading = true;
			this.$apollo
				.query({
					query: GET_USER,
					variables: {
						id: this.$route.params.id
					}
				})
				.then(({ data }) => {
					this.usuario = data.usuario;
					this.loading = false;
				});
		}
	},
	created() {
		this.fetchUser();
	}
});
</script>
