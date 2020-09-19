<template lang="pug">
  b-tab-item(
    label="Transações"
    icon="chart-pie"
  )
    .container
      h1(v-if="isLoading") Carregando
      template(v-else)
        router-link(
          v-for="venda in vendas"
          :key="venda.imovel.id + venda.id"
          :to="`/show/imovel/${venda.imovel.id}`"
        ).box
          h1.title.is-6.is-uppercase.has-text-primary {{ venda.imovel.categoria }}
          p R$ {{ venda.valor }}
          p {{ new Date(Number(venda.data)).toLocaleString() }}
          

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getVendas } from '@/queries/user';
import { VendasUsuario, Categoria } from "@/types"
import numeral from "numeral"

@Component({})
export default class Vendas extends Vue {

  private isLoading: boolean = true;
  private vendas: VendasUsuario.Venda[] = [];

  mounted() {
    this.isLoading = true;
    getVendas(this.$route.params.id).then((resp) => {
      this.vendas = resp.data.usuario.vendas.map(venda => ({
        ...venda,
        valor: numeral(venda.valor).format("0.00[,]00"),
        imovel: {
          ...venda.imovel,
          categoria: Categoria[Number(venda.imovel.categoria)]
        }
      }))
      this.isLoading = false;
    });
  }
}
</script>
