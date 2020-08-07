<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="level">
          <div class="level-left">
            <h1 class="title is-5">
              <router-link to="/cadastro/imovel">Imóveis</router-link> /
              Visualizar
            </h1>
          </div>
          <div class="level-right buttons">
            <b-button
              icon-left="history"
              type="is-primary"
              @click="handleOpenHistorico()"
              >Historico</b-button
            >
            <b-button icon-left="handshake" type="is-success">Vender</b-button>
            <b-button
              icon-left="edit"
              type="is-info"
              @click="handleEditarImovel()"
            ></b-button>
            <b-button
              icon-left="trash"
              type="is-danger"
              @click="handleApagarImovel()"
            ></b-button>
          </div>
        </div>
        <hr />
        <div class="columns is-multiline">
          <article class="column is-6">
            <div>
              <h1 class="title is-5">Informações</h1>
              <div class="columns">
                <div class="column is-2">
                  <strong>Valor Proposto: </strong>
                </div>
                <div class="column">
                  <p v-if="!loading" size="is-medium" type="is-success">
                    R$ {{ imovel.valorProposta }}
                  </p>
                  <b-skeleton v-else active animated width="50px"></b-skeleton>
                </div>
              </div>
              <div class="columns">
                <div class="column is-2">
                  <strong>Quartos: </strong>
                </div>
                <div class="column">
                  <p v-if="!loading" size="is-medium">
                    {{ imovel.numQuartos }}
                  </p>
                  <b-skeleton v-else animated active width="50px"></b-skeleton>
                </div>
              </div>
              <div class="columns">
                <div class="column is-2">
                  <strong>Categoria: </strong>
                </div>
                <div class="column">
                  <p v-if="!loading" size="is-medium">
                    {{ imovel.categoria | Categoria }}
                  </p>
                  <b-skeleton v-else animated active width="50px"></b-skeleton>
                </div>
              </div>

              <div class="columns">
                <div class="column is-2">
                  <strong>Endereço: </strong>
                </div>
                <div class="column">
                  <p v-if="!loading">
                    {{ imovel.endereco.cidade }}/{{ imovel.endereco.uf }} -
                    {{ imovel.endereco.bairro }} -
                    {{ imovel.endereco.logradouro }} -
                    {{ imovel.endereco.numero }} -
                    {{ imovel.endereco.complemento }} -
                    {{ imovel.endereco.cep }}
                  </p>
                  <b-skeleton v-else animated active width="100"></b-skeleton>
                </div>
              </div>
              <div class="columns">
                <div class="column is-2">
                  <strong>Descrição: </strong>
                </div>
                <div class="column">
                  <div
                    class="notification"
                    v-if="!loading"
                    v-html="imovel.descricao"
                  ></div>
                  <b-skeleton v-else animated active width="50px"></b-skeleton>
                </div>
              </div>
            </div>
          </article>
          <article class="column is-6">
            <div class="block">
              <h1 class="title is-5">Proprietário(s)</h1>
              <template v-if="!imovel">
                <div v-for="p in 3" :key="p" class="box">
                  <div class="media">
                    <div class="media-left">
                      <b-skeleton
                        animated
                        circle
                        width="48"
                        height="48"
                      ></b-skeleton>
                    </div>
                  </div>
                </div>
              </template>

              <div
                v-else
                v-for="proprietario in imovel.proprietarios"
                :key="proprietario.email"
                class="box"
              >
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-square is-48x48">
                      <img
                        :src="proprietario.urlImg"
                        alt=""
                        class="is-rounded"
                      />
                    </figure>
                  </div>
                  <div class="media-right">
                    <router-link
                      class="has-text-weight-bold"
                      :to="{ path: `/show/cliente/${proprietario.id}` }"
                    >
                      {{ proprietario.nome }} {{ proprietario.sobrenome }}
                    </router-link>
                    <p>{{ proprietario.email }}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
        <footer>
          <b-tabs v-model="activeTab" expanded>
            <b-tab-item label="Vistorias" icon="bug">
              <Vistoria></Vistoria>
            </b-tab-item>
            <b-tab-item label="Documentos" icon="file-alt">
              <Documento></Documento>
            </b-tab-item>
            <b-tab-item label="Mídias" icon="video">
              <Midia></Midia>
            </b-tab-item>
          </b-tabs>
        </footer>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { GET_IMOVEL, DELETE_IMOVEL } from "@/queries/imovel";
import Documento from "@/components/documentos/Documento.vue";
import Midia from "@/components/midia/Midia.vue";
import Vistoria from "@/components/vistoria/Vistoria.vue";
import Historico from "@/components/Historico.vue";
import { Categoria } from "@/types";
import ImovelForm from "@/components/forms/Imovel.vue";

export default Vue.extend({
  name: "VisualizarImovel",
  data: () => ({
    activeTab: 0,
    documentosUpload: [],
    imovel: null,
    loading: false,
  }),
  components: {
    Midia,
    Vistoria,
    Documento,
  },
  filters: {
    Categoria(cat: number) {
      return Categoria[cat];
    },
  },
  methods: {
    handleApagarImovel() {
      this.$buefy.dialog.confirm({
        title: "Apagar Imóvel",
        message: `
          Remover um Imóvel é uma ação que não pode ser desfeita.
          Caso o Imóvel possua dados vinculados a conta, a remoção não será efetuada.
          Para remover um Imóvel é necessário remover todos os seus vinculos
         `,
        cancelText: "Cancelar",
        confirmText: "APAGAR",
        type: "is-danger",
        onConfirm: () => {
          this.loading = true;
          const { id } = this.$route.params;

          this.$apollo
            .mutate({
              mutation: DELETE_IMOVEL,
              variables: {
                id,
              },
            })
            .then(() => {
              this.$router.push({ path: "/cadastro/imovel" });
            })
            .catch(() => {
              this.$buefy.toast.open({
                message: "Não foi possível remover o Imóvel",
                type: "is-danger",
              });
              this.loading = false;
            });
        },
      });
    },
    handleEditarImovel() {
      this.$buefy.modal.open({
        parent: this,
        component: ImovelForm,
        fullScreen: true,
        hasModalCard: true,
        props: {
          isEditing: true,
          imovelEdit: this.imovel,
        },
        events: {
          refresh: this.fetchImovel,
        },
      });
    },
    handleOpenHistorico() {
      this.$buefy.modal.open({
        component: Historico,
        parent: this,
        hasModalCard: true,
      });
    },
    fetchImovel() {
      this.loading = true;
      this.$apollo
        .query({
          query: GET_IMOVEL,
          variables: {
            id: this.$route.params.id,
          },
        })
        .then(({ data }) => {
          this.imovel = data.imovel;
          this.loading = false;
        });
    },
  },
  created() {
    this.fetchImovel();
  },
});
</script>
