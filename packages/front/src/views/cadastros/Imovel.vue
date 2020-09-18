<template lang="pug">
  section.section
    .container
      .level
        .level-left
          h1.title.is-3 Imóveis
        .level-rigth
          b-button(
            icon-left="plus",
            type="is-primary",
            outlined, @click="handleAdicionar()"
          ) Criar novo
      .columns.is-multiline
        div(
          v-for="imovel in imoveis"
          :key="imovel.createdAt"
        ).column.is-4
          router-link(
            :to="`/show/imovel/${imovel.id}`"
          ).box.px-5.py-5
            h1.title.is-6.is-uppercase.has-text-primary {{ imovel.categoria | categoria }}
            h1.subtitle.is-4 R$ {{ imovel.valorProposta }}
            div(v-html="imovel.descricao").notification.py-0.px-0.is-white
            hr
            div.columns
              .column.is-4
                b-tag Situação: {{ imovel.situacao | situacao }}
              .column.is-2
                b-tag Quartos: {{ imovel.numQuartos }}

      template(v-if="!loading && imoveis.length <= 0")
</template>

<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import ModalImovel from "@/components/forms/Imovel.vue";
import { Categoria } from "@/types";
// @ts-ignore
import numeral from "numeral";

export default Vue.extend({
  name: "imovel",
  data: () => ({
    imoveis: [],
    loading: false,
  }),
  filters: {
    situacao(val: number) {
      if (val === 1) {
        return "A Venda";
      }
      return "Vendido";
    },
    categoria(key: number) {
      return Categoria[key];
    },
  },
  methods: {
    handleAdicionar() {
      this.$buefy.modal.open({
        parent: this,
        hasModalCard: true,
        component: ModalImovel,
        props: {},
        fullScreen: true,
        events: {
          reload: () => {
            this.fetchImoveis();
          },
        },
      });
    },
    fetchImoveis() {
      this.$apollo
        .query({
          query: gql`
            query imoveis {
              imoveis {
                id
                categoria
                descricao
                numQuartos
                situacao
                valorProposta
                endereco {
                  id
                }
              }
            }
          `,
        })
        .then(({ data }) => {
          this.imoveis = data.imoveis.map((imovel: any) => ({
            ...imovel,
            valorProposta: numeral(imovel.valorProposta).format("0.00[,]00")
          }));
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  created() {
    this.loading = true;
    this.fetchImoveis();
  },
});
</script>
