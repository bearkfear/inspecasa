<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <article class="column is-3">
            <div class="">
              <b-field class="file" :disabled="loading">
                <b-upload
                  v-model="file"
                  accept="image/*"
                  @input="selectImage"
                  drag-drop
                  class="is-rounded"
                  :disabled="isUploading"
                >
                  <b-skeleton
                    animated
                    circle
                    width="128"
                    height="128"
                    v-if="loading"
                  ></b-skeleton>
                  <figure v-else class="image is-128x128">
                    <img
                      class="is-rounded"
                      :src="reader ? reader : usuario.urlImg"
                    />
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

              <b-skeleton animated width="128" v-if="loading"></b-skeleton>
              <h1 class="title is-3" v-else>
                {{ usuario.nome }} {{ usuario.sobrenome }}
              </h1>
              <h2 class="title is-6"> {{ usuario.email }}</h2>

              <p>
                <b-skeleton animated width="128" v-if="loading"></b-skeleton
                ><span v-else>{{ usuario.bio }}</span>
              </p>
              <hr />
              <div class="buttons">
								<b-button type="is-info" icon-left="edit">Editar</b-button>
                <b-button type="is-danger" icon-left="trash">Apagar</b-button>
              </div>
            </div>
          </article>
          <article class="column">
            <b-tabs>
              <b-tab-item label="Geral" icon="address-card">
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
              </p><p>
                <strong>Função:</strong>
                <b-skeleton animated width="128" v-if="loading"></b-skeleton>
                <span v-else> {{ usuario.funcao }}</span>
              </p>
              </b-tab-item>
              <b-tab-item label="Vendas" icon="chart-pie">
                <div><p>Nenhuma venda ainda!</p></div>
              </b-tab-item>
            </b-tabs>
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
    isUploading: false,
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
          (snapshot) => {
            this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.error(error);
            this.file = null;
            this.reader = null;
          },
          async () => {
            const downloadUrl = String(
              await uploadTask.snapshot.ref.getDownloadURL()
            );
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
            urlImg: url,
          },
        },
      });
    },
    removeFoto() {
      this.file = null;
      this.reader = null;
    },
    selectImage(image: File) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (event) => {
        this.reader = event?.target?.result || null;
      };
    },
    fetchUser() {
      this.loading = true;
      this.$apollo
        .query({
          query: GET_USER,
          variables: {
            id: this.$route.params.id,
          },
        })
        .then(({ data }) => {
          this.usuario = data.usuario;
          this.loading = false;
        });
    },
  },
  created() {
    this.fetchUser();
  },
});
</script>
