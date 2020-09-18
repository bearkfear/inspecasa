<template>
  <div>
    <hr>
    <div v-for="list in documentos" :key="list.id" class="box">
      <div class="media">
        <div class="media-left">
          <b-icon icon="file" size="is-large" />
        </div>
        <div class="media-content">
          <p><b>Descrição: </b>{{ list.descricao }}</p>
          <p><b>Criado em: </b>{{ new Date(Number(list.createdAt)).toLocaleString() }}</p>
          <a :href="list.url" target="_blank" class="button is-small is-primary">Baixar</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { GET_DOCS_FROM_IMOVEL } from "@/queries/docs";
// import { Midia } from "@/types";
import eventBus, { TYPES } from "@/eventBus";

interface Data {
  current: number;
  documentos: any[];
}

export default Vue.extend({
  name: "ListMidias",

  data: (): Data => ({
    current: 0,
    documentos: [],
  }),
  methods: {
    info(value: number) {
      this.current = value;
    },
    fetchDocs() {
      this.$apollo
        .query({
          query: GET_DOCS_FROM_IMOVEL,
          variables: {
            id: this.$route.params.id,
          },
        })
        .then(({ data }) => {
          this.documentos = data.imovel.documentos;
        });
    },
  },
  created() {
    this.fetchDocs();
    eventBus.$on(TYPES.REFRESH_LIST_DOCS, () => {
      this.fetchDocs();
    });
  },
});
</script>

<style scoped></style>
