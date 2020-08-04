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
            <b-button icon-left="edit" type="is-info"></b-button>
            <b-button icon-left="trash" type="is-danger"></b-button>
          </div>
        </div>
        <hr />
        <div class="columns is-multiline">
          <article class="column is-6">
            <div>
              <h1 class="title is-5">Informações</h1>
              <p>
                <strong>Preço: </strong>
                <span v-if="!loading">{{ imovel.valorProposta }}</span>
                <b-skeleton v-else active animated width="50px"></b-skeleton>
              </p>
              <p>
                <strong>Quartos: </strong>
                <span v-if="!loading">{{ imovel.numQuartos }}</span>
                <b-skeleton v-else animated active width="50px"></b-skeleton>
              </p>
              <p>
                <strong>Categoria: </strong>
                <span v-if="!loading">{{ imovel.categoria }}</span>
                <b-skeleton v-else animated active width="50px"></b-skeleton>
              </p>
              <strong>Descrição: </strong>
              <p v-if="!loading" v-html="imovel.descricao"></p>
              <b-skeleton v-else animated active width="50px"></b-skeleton>

              <p>
                <strong>Endereço: </strong>
              </p>
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
                    <figure class="image is-48x48">
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
import { GET_IMOVEL } from "@/queries/imovel";
import Documento from "@/components/documentos/Documento.vue";
import Midia from "@/components/midia/Midia.vue";
import Vistoria from "@/components/vistoria/Vistoria.vue";
import Historico from "@/components/Historico.vue";

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
    Documento
  },
  methods: {
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
