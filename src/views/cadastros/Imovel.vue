<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="level">
          <div class="level-left">
            <h1 class="title is-3">Imóveis</h1>
          </div>
          <div class="level-rigth">
            <b-button
              icon-left="plus"
              type="is-primary"
              outlined
              @click="handleAdicionar()"
              >Criar novo</b-button
            >
          </div>
        </div>

        <section>
          <div
            class="box hover-click"
            v-for="imovel in imoveis"
            :key="imovel.createdAt"
            @click="$router.push({ path: `/show/imovel/${imovel.id}` })"
          >
            <h1 class="title is-6">
              Valor Proposto: R$: {{ imovel.valorProposta }}
            </h1>
            <p>Categoria: {{ imovel.categoria | categoria }}</p>
            <p>Situação: {{ imovel.situacao | situacao }}</p>
            <p>Quartos: {{ imovel.numQuartos }}</p>
            <div class="notification">
              <div v-html="imovel.descricao"></div>
            </div>
          </div>
        </section>
        <template v-if="!loading && imoveis.length <= 0">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon icon="frown-open" size="is-large"> </b-icon>
              </p>
              <p>Sem Registros. Crie um!</p>
            </div>
          </section>
        </template>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import ModalImovel from "@/components/forms/Imovel.vue";
import { Categoria } from "@/types";

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
          this.imoveis = data.imoveis;
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
<style lang="scss" scoped>
.hover-click {
  transition-duration: 0.3s;
  cursor: pointer;
}

.hover-click:hover {
  box-shadow: 0 0 6px #ef6327;
}
</style>
