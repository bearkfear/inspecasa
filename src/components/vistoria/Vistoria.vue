<template>
  <div>
    <div class="level">
      <div class="level-left"></div>
      <div class="level-right">
        <b-button type="is-primary" icon-left="plus" @click="handleOpenForm()"
          >Adicionar</b-button
        >
      </div>
    </div>
    <hr />
    <div v-if="vistorias.length === 0" class="notification">
      Nenhuma vistoria ainda!
    </div>
    <div v-for="vistoria in vistorias" :key="vistoria.id" class="box">
      <div class="media">
        <div class="media-left">
          <router-link
            :to="{ path: `/show/usuario/${vistoria.responsavel.id}` }"
          >
            <figure class="image is-48x48">
              <img class="is-rounded" :src="vistoria.responsavel.urlImg" />
            </figure>
            <h4 class="has-text-weight-bold">
              {{ vistoria.responsavel.nome }}
            </h4>
          </router-link>
        </div>
        <div class="media-content">
          <div class="notification">
            {{ vistoria.observacao }}
          </div>
          <p class="has-text-weight-bold">
            {{ new Date(Number(vistoria.createdAt)).toLocaleString() }}
          </p>

          <div v-for="midia in vistoria.midias" :key="midia.id" class="media">
            <div class="media-left">
              <figure
                v-if="midia.extensao !== '.mp4'"
                class="image is-64x64 is-square"
              >
                <img :src="midia.url" alt="" />
              </figure>
              <figure v-else class="image is-64x64">
                <video :src="midia.url" controls></video>
              </figure>
            </div>
            <div class="media-content notification">
              <p>{{ midia.descricao }}</p>
            </div>
            <div class="media-right">
              <b-button
                icon-left="share"
                tag="a"
                :href="midia.url"
                target="_blank"
                size="is-small"
              ></b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { GET_VISTORIAS_FROM_IMOVEL } from "@/queries/imovel";
import Form from "../forms/Vistoria.vue";

export default Vue.extend({
  name: "Vistoria",
  data: () => ({
    vistorias: [],
  }),
  methods: {
    fetchVistorias() {
      this.$apollo
        .query({
          query: GET_VISTORIAS_FROM_IMOVEL,
          variables: {
            imovelId: this.$route.params.id,
          },
        })
        .then(({ data }) => {
          this.vistorias = data.imovel.vistorias;
        });
    },
    handleOpenForm() {
      this.$buefy.modal.open({
        parent: this,
        component: Form,
        hasModalCard: true,
        fullScreen: true,
        events: {},
        props: {},
        canCancel: false,
      });
    },
  },
  created() {
    this.fetchVistorias();
  },
});
</script>
<style scoped></style>
