<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <div>
        <h1 class="modal-card-title">
          {{ isEditing ? 'Editar' : 'Adicionar' }} Usuario
        </h1>
        <p>Preencha as informações sobre o Usuario</p>
      </div>
    </header>
    <section class="modal-card-body">
      <div>
        <div class="columns">
          <div class="column is-2">
            <b-field class="file" :disabled="loading || isSubmitting">
              <b-upload
                v-model="file"
                accept="image/*"
                @input="selectImage"
                drag-drop
                :disabled="isUploading"
              >
                <b-skeleton
                  animated
                  width="128"
                  height="128"
                  v-if="loading"
                ></b-skeleton>
                <figure v-else class="image is-128x128 is-square">
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
          <div class="column">
            <b-field label="Nome">
              <b-input
                placeholder="Nome"
                v-model="usuario.nome"
                :disabled="isSubmitting"
              >
              </b-input>
            </b-field>
            <b-field label="Sobrenome">
              <b-input
                placeholder="Sobrenome"
                v-model="usuario.sobrenome"
                :disabled="isSubmitting"
              >
              </b-input>
            </b-field>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <b-field label="E-mail">
              <b-input
                type="email"
                placeholder="example@inspecasa.site"
                v-model="usuario.email"
                required
                :disabled="isSubmitting || isEditing"
              >
              </b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Senha">
              <b-input
                type="password"
                required
                placeholder="******"
                v-model="password"
                :disabled="isSubmitting || isEditing"
              ></b-input>
            </b-field>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <b-field label="Biografia">
              <b-input
                type="text"
                placeholder="Tomo um café antes de fechar um negócio"
                v-model="usuario.bio"
                :disabled="isSubmitting"
              >
              </b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Função">
              <b-input
                type="text"
                placeholder="Cargo ou função"
                v-model="usuario.funcao"
                :disabled="isSubmitting"
              >
              </b-input>
            </b-field>
          </div>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <div class="is-pulled-right">
        <b-button @click="$emit('close')">
          Fechar
        </b-button>

        <b-button
          v-if="!isEditing"
          type="is-success"
          :loading="isSubmitting"
          :disabled="isSubmitting"
          @click="addUsuario"
        >
          Adicionar
        </b-button>
        <b-button
          v-else
          type="is-success"
          @click="handleUpdateUsuario()"
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
import * as firebase from "firebase/app";
import { GET_USER, UPDATE_USER, STORE_USER } from "@/queries/user";
import uuid from "uuid-random";
import { Usuario } from "@/types";

interface Data {
  usuario: null | Usuario;
  loading: boolean;
  file: File | null;
  reader: string | ArrayBuffer | null;
  progress: number;
  isUploading: boolean;
  password: null | string;
  isSubmitting: boolean;
}
// Data, Methods, Computed, Props
export default Vue.extend({
  name: "UsuarioForm",
  props: {
    isEditing: {
      required: false,
      default: false,
      type: Boolean,
    },
    usuarioEdit: {
      required: false,
      default: null,
      type: Object,
    },
  },
  data: (): Data => ({
    usuario: null,
    password: null,
    file: null,
    isUploading: false,
    progress: 0,
    reader: null,
    loading: false,
    isSubmitting: false,
  }),
  methods: {
    async handleUpdateUsuario() {
      this.loading = true;
      try {
        await this.$apollo.mutate({
          mutation: UPDATE_USER,
          variables: {
            id: this.$route.params.id,
            usuario: {
              nome: this.usuario?.nome,
              sobrenome: this.usuario?.sobrenome,
              funcao: this.usuario?.funcao,
              bio: this.usuario?.bio,
              urlImg: this.usuario?.urlImg,
            },
          },
        });
        this.$buefy.toast.open({
          message: "Dados do Usuário atualizados com sucesso!",
          type: "is-success",
        });
        this.$emit("refresh");
        this.$emit("close");
      } catch (error) {
        this.$buefy.toast.open({
          message: "Não foi possível atualizar os dados do Usuario",
          type: "is-danger",
        });
        this.loading = false;
      }
    },
    async addUsuario() {
      try {
        this.isSubmitting = true;
        await this.$apollo.mutate({
          mutation: STORE_USER,
          variables: {
            usuario: this.usuario,
            password: this.password,
          },
        });

        this.$emit("reload");
        this.$emit("close");
        this.isSubmitting = false;
      } catch (e) {
        console.log();
        if (e.graphQLErrors.length) {
          this.$buefy.snackbar.open({
            message: e.graphQLErrors[0].message,
            type: "is-danger",
          });
        } else {
          this.$buefy.snackbar.open({
            message: e.networkError.result.errors[0].message,
            type: "is-danger",
          });
        }

        this.isSubmitting = false;
      }
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
      if (this.usuario?.id) {
        return this.$apollo.mutate({
          mutation: UPDATE_USER,
          variables: {
            id: this.usuario?.id,
            usuario: {
              urlImg: url,
            },
          },
        });
      }
      return Promise.resolve();
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
  },
  created() {
    this.usuario = {
      urlImg:
        "https://firebasestorage.googleapis.com/v0/b/inspecasa.appspot.com/o/user-placeholder.jpeg?alt=media&token=81babb0c-d997-4e6a-a4f0-81c153db94ea",
      nome: null,
      sobrenome: null,
      funcao: null,
      email: null,
      bio: null,
    };
  },
  mounted() {
    if (this.isEditing) {
      const {
        __typename,
        uid,
        id,
        createdAt,
        changedAt,
        ...usuarioEdit
      } = this.usuarioEdit;
      this.usuario = { ...this.usuario, ...usuarioEdit };
    }
  },
});
</script>
