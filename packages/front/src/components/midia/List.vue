<template>
  <div class="container columns">
    <div v-for="list in midias" :key="list.id" class="card card-custom column is-2">
      <div class="card-image">
        <video v-if="list.extensao === '.mp4'" controls :src="list.url" />
        <figure v-else class="image">
          <img :src="list.url" />
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <h2 class="title is-6">{{ list.descricao }}</h2>
          <p class="subtitle is-7">
            Criado em:
            {{ new Date(Number(list.createdAt)).toLocaleString() }}
          </p>
          <div class="field is-grouped">
            <p class="control" style="margin-left: auto;">
              <a
                class="button is-primary is-small is-outlined"
                :href="list.url"
                target="_blank"
                >Abrir</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { GetMidiasFromImovel, GET_MIDIAS_FROM_IMOVEL } from "@/queries/midia";
import { Midia } from "@/types";
import eventBus, { TYPES } from "@/eventBus";

interface Data {
  current: number;
  midias: Midia[];
}

export default Vue.extend({
  name: "ListaDeMas",

  data: (): Data => ({
    current: 0,
    midias: [],
  }),
  methods: {
    info(value: number) {
      this.current = value;
    },
    fetchMidias() {
      this.$apollo
        .query<GetMidiasFromImovel>({
          query: GET_MIDIAS_FROM_IMOVEL,
          variables: {
            id: this.$route.params.id,
          },
        })
        .then(({ data }) => {
          this.midias = data.imovel.midias;
        });
    },
  },
  created() {
    this.fetchMidias();
    eventBus.$on(TYPES.REFRESH_LIST_MIDIAS, () => {
      this.fetchMidias();
    });
  },
});
</script>

<style scoped>

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px 0;
}

.card-custom{
  margin: 10px;
}
</style>
