<template>
  <div>
    <hr />
    <b-carousel-list v-model="current" :data="midias" :items-to-show="4">
      <template slot="item" slot-scope="{ list }">
        <div class="card">
          <div class="card-image">
            <figure class="image is-5by4">
              <a :href="list.url" target="_blank"><img :src="list.url" /></a>
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
                  <button class="button is-small is-danger is-outlined">
                    <b-icon size="is-small" icon="heart" />
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </b-carousel-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { GetMidiasFromImovel, GET_MIDIAS_FROM_IMOVEL } from "@/queries";
import { Midia } from "@/types";

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
          this.midias.push(...data.imovel.midias);
        });
    },
  },
  created() {
    this.fetchMidias();
  },
});
</script>
