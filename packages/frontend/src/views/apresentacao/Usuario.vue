<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <article class="column is-3">
            <div>
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
                  <figure v-else class="image is-square is-128x128">
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

              <b-skeleton animated width="128" v-if="loading"></b-skeleton>
              <h2 v-else class="title is-6">{{ usuario.email }}</h2>

              <p>
                <b-skeleton animated width="128" v-if="loading"></b-skeleton
                ><span v-else>{{ usuario.bio }}</span>
              </p>
              <hr />
              <div class="buttons">
                <b-button
                  type="is-info"
                  icon-left="edit"
                  @click="handleOpenEdit()"
                  >Editar</b-button
                >
                <b-button
                  type="is-danger"
                  icon-left="trash"
                  @click="handleApagarUsuario()"
                  >Apagar</b-button
                >
              </div>
            </div>
          </article>
          <article class="column">
            <b-tabs  v-model="activeTab">
              <b-tab-item label="Geral" icon="address-card">
                <div class="columns">
                  <div class="column is-2">
                    <strong>Bio:</strong>
                  </div>
                  <div class="column">
                    <b-skeleton animated width="128" v-if="loading"></b-skeleton
                    ><span v-else>{{ usuario.bio }}</span>
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-2">
                    <strong>Primeiro Acesso:</strong>
                  </div>
                  <div class="column">
                    <b-skeleton
                      animated
                      width="128"
                      v-if="loading"
                    ></b-skeleton>
                    <span v-else>
                      {{ new Date(Number(usuario.createdAt)).toLocaleString() }}
                    </span>
                  </div>
                </div>

                <div class="columns">
                  <div class="column is-2">
                    <strong>Último Acesso:</strong>
                  </div>
                  <div class="column">
                    <b-skeleton
                      animated
                      width="128"
                      v-if="loading"
                    ></b-skeleton>
                    <span v-else>
                      {{ new Date(Number(usuario.changedAt)).toLocaleString() }}
                    </span>
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-2">
                    <strong>Função:</strong>
                  </div>
                  <div class="column">
                    <b-skeleton
                      animated
                      width="128"
                      v-if="loading"
                    ></b-skeleton>
                    <span v-else> {{ usuario.funcao }}</span>
                  </div>
                </div>
              </b-tab-item>
              <vendas></vendas>
            </b-tabs>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import firebase from 'firebase/app';
import { GET_USER, UPDATE_USER, DELETE_USER } from '@/queries/user';
import uuid from 'uuid-random';
import UsuarioForm from '@/components/forms/Usuario.vue';
import Vendas from '@/components/usuario/vendas/index.vue';
import { Vue, Component } from 'vue-property-decorator';

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
@Component({
  components: {
    Vendas,
  },
})
export default class VisualizarUsuario extends Vue {
  private activeTab: number = 1;
  private usuario: Usuario | null = null;
  private loading: boolean = false;
  private file: File | null = null;
  private reader: string | ArrayBuffer | null = null;
  private progress: number = 0;
  private isUploading: boolean = false;

  handleApagarUsuario() {
    this.$buefy.dialog.confirm({
      title: 'Apagar Usuário',
      message: `
          Remover um Usuário é uma ação que não pode ser desfeita.
          Caso o usuário possua dados vinculados a conta, a remoção não será efetuada.
          Para remover um usuário é necessário remover todos os seus vinculos
         `,
      cancelText: 'Cancelar',
      confirmText: 'APAGAR',
      type: 'is-danger',
      onConfirm: () => {
        this.loading = true;
        const { id } = this.$route.params;

        this.$apollo
          .mutate({
            mutation: DELETE_USER,
            variables: {
              id,
            },
          })
          .then(() => {
            this.$router.push({ path: '/cadastro/usuario' });
          })
          .catch(() => {
            this.$buefy.toast.open({
              message: 'Não foi possível apagar o Usuário',
              type: 'is-danger',
            });
            this.loading = false;
          });
      },
    });
  }
  handleOpenEdit() {
    this.$buefy.modal.open({
      parent: this,
      component: UsuarioForm,
      hasModalCard: true,
      fullScreen: true,
      props: {
        isEditing: true,
        usuarioEdit: this.usuario,
      },
      events: {
        refresh: this.fetchUser,
      },
    });
  }
  saveFoto() {
    const { file } = this;
    if (file !== null) {
      this.isUploading = true;
      const storage = firebase.storage().ref();
      const uploadTask = storage.child(`profile_images/${uuid()}`).put(file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          this.progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
  }
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
  }
  removeFoto() {
    this.file = null;
    this.reader = null;
  }
  selectImage(image: File) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (event) => {
      this.reader = event?.target?.result || null;
    };
  }
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
  }

  created() {
    this.fetchUser();
  }
}
</script>
