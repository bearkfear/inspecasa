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
                  :disabled="isUploading"
                >
                  <b-skeleton
                    animated
                    circle
                    width="128"
                    height="128"
                    v-if="loading"
                  ></b-skeleton>
                  <figure v-else class="image is-square is-128x128">
                    <img
                      class="is-rounded"
                      :src="reader ? reader : cliente.urlImg"
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
                {{ cliente.nome }} {{ cliente.sobrenome }}
              </h1>

              <b-skeleton animated width="128" v-if="loading"></b-skeleton>
              <h2 v-else class="title is-6">{{ cliente.email }}</h2>

              <p>
                <b-skeleton animated width="128" v-if="loading"></b-skeleton
                ><span v-else>{{ cliente.bio }}</span>
              </p>
              <hr />
              <div class="buttons">
                <b-button
                  type="is-info"
                  icon-left="edit"
                  @click="openEdit()"
                  :disabled="loading"
                  >Editar</b-button
                >
                <b-button
                  type="is-danger"
                  icon-left="trash"
                  :disabled="loading"
                  @click="handleApagarCliente()"
                  >Apagar</b-button
                >
              </div>
            </div>
          </article>
          <article class="column">
            <b-tabs>
              <b-tab-item label="Geral" icon="address-card">
                <p>
                  <strong>Bio: </strong>
                  <b-skeleton animated width="128" v-if="loading"></b-skeleton
                  ><span v-else>{{ cliente.bio }}</span>
                </p>
                <p>
                  <strong>Primeiro Acesso:</strong>
                  <b-skeleton animated width="128" v-if="loading"></b-skeleton>
                  <span v-else>
                    {{ new Date(Number(cliente.createdAt)).toLocaleString() }}
                  </span>
                </p>
                <p>
                  <strong>Ultimo Acesso:</strong>
                  <b-skeleton animated width="128" v-if="loading"></b-skeleton>
                  <span v-else>
                    {{ new Date(Number(cliente.changedAt)).toLocaleString() }}
                  </span>
                </p>
              </b-tab-item>
              <b-tab-item label="Transações" icon="wallet">
                <div>
                  <p>
                    Nenhuma transação ainda!
                  </p>
                </div>
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
import * as firebase from "firebase/app";
import { GET_CLIENTE, UPDATE_CLIENTE, DELETE_CLIENTE } from "@/queries/cliente";
import uuid from "uuid-random";
import ClienteForm from "@/components/forms/Cliente.vue";

interface Data {
  cliente: any;
  loading: boolean;
  file: File | null;
  reader: string | ArrayBuffer | null;
  progress: number;
  isUploading: boolean;
}

export default Vue.extend({
  name: "VisualizarCliente",
  data: (): Data => ({
    cliente: null,
    loading: false,
    file: null,
    reader: null,
    progress: 0,
    isUploading: false,
  }),
  methods: {
    handleApagarCliente() {
      this.$buefy.dialog.confirm({
        title: "Apagar Cliente",
        message: `
          Remover um cliente é uma ação que não pode ser desfeita.
          Caso o cliente possua imoveis e/ou outros dados vinculados a conta, a remoção não será efetuada.
          Para remover um cliente é necessário remover todos os seus vinculos
         `,
        cancelText: "Cancelar",
        confirmText: "APAGAR",
        type: "is-danger",
        onConfirm: () => {
          this.loading = true;
          const { id } = this.$route.params;

          this.$apollo
            .mutate({
              mutation: DELETE_CLIENTE,
              variables: {
                id,
              },
            })
            .then(() => {
              this.$router.push({ path: "/cadastro/cliente" });
            })
            .catch(() => {
              this.$buefy.toast.open({
                message: "Não foi possível apagar o Cliente",
                type: "is-danger",
              });
              this.loading = false;
            });
        },
      });
    },
    openEdit() {
      this.$buefy.modal.open({
        parent: this,
        component: ClienteForm,
        hasModalCard: true,
        fullScreen: true,
        props: {
          isEditing: true,
          clienteEdit: this.cliente,
        },
        events: {
          refresh: this.fetchUser,
        },
      });
    },
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
            if (downloadUrl && this.cliente) {
              await this.updateUserImage(downloadUrl);
              this.cliente.urlImg = downloadUrl;
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
        mutation: UPDATE_CLIENTE,
        variables: {
          id: this.cliente?.id,
          cliente: {
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
          query: GET_CLIENTE,
          variables: {
            id: this.$route.params.id,
          },
        })
        .then(({ data }) => {
          this.cliente = data.cliente;
          this.loading = false;
        });
    },
  },
  created() {
    this.fetchUser();
  },
});
</script>
