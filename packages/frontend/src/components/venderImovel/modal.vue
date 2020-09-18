<template lang="pug">
  .modal-card
    header.modal-card-head
      h1.modal-card-title Vender
    section.modal-card-body
      .container
        .columns.is-centered
          .column
            b-field(label="Vendedor" message="Para trocar de vendedor, entre com outro usuário")
              b-select(:value="$store.state.auth.user.id" disabled expanded)
                option(:value="$store.state.auth.user.id").
                  {{ `${$store.state.auth.user.nome} ${$store.state.auth.user.sobrenome}` }}
            b-field(
              label="Compradores"
              :type="errors.compradores"
              message="Precisa ter pelo menos um"
            )
              multiselect(
                v-model="compradores"
                label="nome"
                track-by="id"
                :loading="loading.clientes"
                placeholder="Digite para buscar"
                deselect-label="Remover"
                select-label="Pressione Enter para selecionar"
                :multiple="true"
                :options="clientesSemProprietarios"
                :searchable="true"
                :close-on-select="false"
                :allow-empty="false"
              )
            b-field(label="Valor" message="O valor da venda será dividido entre os compradores")
              input.input(
                v-model.lazy="valor"
                type="text"
                min="0"
                :loading="loading.imovel"
                v-money="moneyConfig"
              )
            b-field(message="Marcando como vendido, removerá o imóvel da listagem de imóveis")
              b-switch(v-model="situacao" :true-value="1" :false-value="0") Marcar como vendido
    footer.modal-card-foot
      b-button(@click="$emit('close')") Fechar
      b-button(
        type="is-success"
        :disabled="isSubmitting"
        :loading="isSubmitting"
        @click="onSubmit"
      ) Efetuar Venda

</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Multiselect from 'vue-multiselect';
import { GET_CLIENTES } from '@/queries/cliente';
import { GET_IMOVEL } from '@/queries/imovel';
import { Action } from 'vuex-class';
import actionTypes from '@/store/modules/imovel/actionTypes';
import { VenderImovel } from '@/store/modules/imovel/types';
import cleanMoney from '@/utils/cleanMoney';

@Component({
  components: {
    Multiselect
  }
})
export default class VenderImovelModal extends Vue {
  @Action(actionTypes.VENDER_IMOVEL) venderImovel: (
    payload: VenderImovel
  ) => Promise<boolean>;

  private isSubmitting = false;

  private situacao = 0;

  private valor = '';

  private dataVenda: Date = new Date();

  private compradores: any[] = [];

  private clientes: any[] = [];

  private imovel: any = {};

  private loading = {
    clientes: false,
    imovel: false
  };

  private moneyConfig = {
    decimal: ',',
    thousands: '.',
    prefix: 'R$ ',
    precision: 2,
    masked: false
  };

  private errors = {
    compradores: ''
  };

  get clientesSemProprietarios() {
    if (this.imovel.proprietarios) {
      return this.clientes.filter(cliente => {
        const { proprietarios } = this.imovel;
        return !proprietarios.find(
          (proprietario: { id: number }) => proprietario.id === cliente.id
        );
      });
    } else {
      return [];
    }
  }

  mounted(): void {
    this.fetchImovel();
    this.fetchClientes();
  }

  onSubmit(): void {
    if (this.compradores.length === 0) {
      this.errors.compradores = 'is-danger';
      return;
    }
    this.confirmarVenda();
  }

  async confirmarVenda(): Promise<void> {
    this.isSubmitting = true;
    const resp = await this.venderImovel({
      id: Number(this.$route.params.id),
      compradores: this.compradores.map(comprador => Number(comprador.id)),
      valor: cleanMoney(this.valor),
      situacao: this.situacao
    });
    if (resp) { 
      this.$buefy.toast.open({
        type: 'is-success',
        message: `Transação efetuada com sucesso!`
      })
      this.$emit('success');
      this.$emit('close');
    } else { 
      this.$buefy.toast.open('Não foi possível concluir a transação');
    }
    this.isSubmitting = false;
  }

  async fetchClientes(): Promise<void> {
    this.loading.clientes = true;
    const { data } = await this.$apollo.query({ query: GET_CLIENTES });
    this.clientes = data.clientes;
    this.loading.clientes = false;
  }

  async fetchImovel(): Promise<void> {
    this.loading.imovel = true;
    const {
      data: { imovel }
    } = await this.$apollo.query({
      query: GET_IMOVEL,
      variables: { id: this.$route.params.id }
    });

    this.imovel = imovel;
    this.valor = this.imovel.valorProposta;
    this.loading.imovel = false;
  }
}
</script>
