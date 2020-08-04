<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <div>
        <h1 class="modal-card-title">
          {{ isEditing ? 'Editar' : 'Adicionar' }} Imóvel
        </h1>
        <p>Preencha as informações gerais sobre o imóvel</p>
      </div>
    </header>
    <section class="modal-card-body">
      <div>
        <b-field label="Categoria">
          <b-select
            v-model.number="imovel.categoria"
            placeholder="Selecione uma categoria de imóvel"
          >
            <option value="0"
              >Apartamento padrão: sala de estar, sala de jantar, cozinha,
              quartos, banheiros</option
            >
            <option value="1"
              >Kitnet: banheiro e cômodo com quarto cozinha e sala sem
              divisórias</option
            >
            <option value="2"
              >Loft: apartamento maior e mais amplos, sem divisórias, com o pé
              direito mais alto e com grandes janelas e muitas vezes com
              mezaninos instalados no ambiente</option
            >
            <option value="3">Duplex: apartamento com dois andares</option>
            <option value="4">Triplex: apartamento com tres andares</option>
            <option value="5"
              >Casa: imóvel com cozinha, sala, área, banheiro e quarto</option
            >
          </b-select>
        </b-field>
        <b-field label="Proprietário(s)">
          <Multiselect
            v-model="donos"
            label="nome"
            track-by="id"
            placeholder="Digite para buscar"
            deselect-label="Precisa selecionar ao menos um!"
            select-label="Pressione Enter para selecionar"
            :multiple="true"
            :options="clientes"
            :searchable="true"
            :close-on-select="false"
            :allow-empty="false"
          ></Multiselect>
        </b-field>
        <b-field label="Descrição">
          <ckeditor
            v-model="imovel.descricao"
            :editor="editor"
            :config="config"
            placeholder="Descreva o imóvel"
          ></ckeditor>
        </b-field>
        <div class="columns">
          <div class="column">
            <b-field label="Valor Proposto">
              <input
                class="input"
                v-model.lazy="imovel.valorProposta"
                type="text"
                min="0"
                placeholder="Qual o valor pretendido para venda"
                v-money="{
                  decimal: ',',
                  thousands: '.',
                  prefix: 'R$ ',
                  precision: 2,
                  masked: false,
                }"
              />
            </b-field>
          </div>
          <div class="column">
            <b-field label="Quantos quartos">
              <b-numberinput
                v-model="imovel.numQuartos"
                min="0"
              ></b-numberinput>
            </b-field>
          </div>
        </div>

        <br />
        <br />
        <h3 class="title is-4">Endereço</h3>
        <p>Informe o endereço</p>
        <hr />
        <div class="columns">
          <b-field label="CEP" class="column is-2">
            <input
              class="input"
              v-model="endereco.cep"
              v-mask="'#####-###'"
              placeholder="Digite o seu CEP"
              @input="handleCep(endereco.cep)"
            />
          </b-field>
          <b-field label="Rua" class="column">
            <b-input
              type="text"
              v-model="endereco.rua"
              placeholder="Nome da rua"
              :loading="loading.loadingCep"
              disabled
            >
            </b-input>
          </b-field>
          <b-field label="Cidade" class="column">
            <b-input
              type="text"
              v-model="endereco.cidade"
              placeholder="Nome da Municipio"
              :loading="loading.loadingCep"
              disabled
            >
            </b-input>
          </b-field>
          <b-field label="UF" class="column is-1">
            <b-input
              placeholder="UF"
              type="text"
              v-model="endereco.uf"
              maxlength="2"
              :loading="loading.loadingCep"
              disabled
            >
            </b-input>
          </b-field>
        </div>
        <div class="columns">
          <b-field label="Bairro" class="column">
            <b-input
              v-model="endereco.bairro"
              placeholder="Nome do bairro"
              :loading="loading.loadingCep"
              disabled
            ></b-input>
          </b-field>
          <b-field label="Complemento" class="column">
            <b-input
              type="text"
              v-model="endereco.complemento"
              placeholder="Complemento"
            >
            </b-input>
          </b-field>
          <b-field label="Número" class="column">
            <b-input
              placeholder="Número da casa"
              type="number"
              v-model.number="endereco.numero"
              min="0"
            ></b-input>
          </b-field>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <div class="is-pulled-right">
        <b-button @click="$emit('close')">
          Fechar
        </b-button>

        <b-button
          v-if="!isEditing"
          type="is-success"
          @click="handleStoreImovel()"
          :loading="isSubmitting"
          :disabled="isSubmitting"
        >
          Adicionar
        </b-button>
        <b-button
          v-else
          type="is-success"
          @click="handleEditImovel()"
          :loading="isSubmitting"
          :disabled="isSubmitting"
        >
          Salvar
        </b-button>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import Multiselect from "vue-multiselect";
// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import CKEDITOR_CONFIG from "@/constants";
import { STORE_IMOVEL_ENDERECO, GET_IMOVEL_ENDERECO, UPDATE_IMOVEL_ENDERECO } from "@/queries/imovel";
import { GET_CLIENTES } from "@/queries/cliente";

import { UPDATE_ENDERECO } from "@/queries/endereco";

import { ViaCep, Endereco } from "@/types";
import cleanMoney from "@/utils/cleanMoney";

interface Data {
  imovel: {
    descricao: string | null;
    valorProposta: string | null;
    categoria: number | null;
    numQuartos: number | null;
    situacao: number | null;
  };
  endereco: Endereco;
  isSubmitting: boolean;
  editor: typeof ClassicEditor;
  config: typeof CKEDITOR_CONFIG;
  isLoading: boolean;
  loading: { [key: string]: boolean };
  clientes: any[];
  donos: any[];
}
// Data, Methods, Computed, Props
export default Vue.extend({
  props: {
    isEditing: {
      required: false,
      default: false,
      type: Boolean,
    },
    idImovel: {
      required: false,
      default: "0",
      type: String,
    },
    idEndereco: {
      required: false,
      default: "0",
      type: String,
    },
  },
  data: (): Data => ({
    donos: [],
    imovel: {
      descricao: null,
      valorProposta: null,
      categoria: null,
      numQuartos: 0,
      situacao: 1,
    },
    endereco: {
      cep: "",
      rua: null,
      logradouro: null,
      complemento: null,
      numero: null,
      uf: null,
      avenida: null,
      cidade: null,
      bairro: null,
    },
    editor: ClassicEditor,
    config: CKEDITOR_CONFIG,
    isSubmitting: false,
    isLoading: false,
    clientes: [],
    loading: {
      clientes: false,
      loadingCep: false,
    },
  }),
  components: {
    Multiselect,
  },
  methods: {
    fetchClientes() {
      this.$apollo
        .query({ query: GET_CLIENTES })
        .then(({ data }) => {
          this.clientes = data.clientes;
        })
        .finally(() => {
          this.loading.clientes = false;
        });
    },
    handleEditImovel() {
      this.isSubmitting = true;
      const val = this.imovel.valorProposta;
      this.$apollo
        .mutate({
          mutation: UPDATE_IMOVEL_ENDERECO,
          variables: {
            imovel: {
              ...this.imovel,
              valorProposta: cleanMoney(String(val)),
            },
            endereco: this.endereco,
            idEndereco: this.idEndereco,
            idImovel: this.idImovel,
          },
        })
        .then(() => {
          this.$emit("reload");
          this.$emit("close");
        });
    },
    handleStoreImovel() {
      this.isSubmitting = true;
      const val = this.imovel.valorProposta;
      interface ResponseMutation {
        storeImovel: {
          id: string;
        };
        storeEndereco: {
          id: string;
        };
      }
      this.$apollo
        .mutate<ResponseMutation>({
          mutation: STORE_IMOVEL_ENDERECO,
          variables: {
            imovel: {
              ...this.imovel,
              valorProposta: cleanMoney(String(val)),
            },
            owners: this.donos.map((dono) => dono.id),
            endereco: this.endereco,
            vendedor: this.$store.state.user.id,
          },
        })
        .then(({ data }) => {
          this.isSubmitting = false;
          this.$apollo
            .mutate({
              mutation: UPDATE_ENDERECO,
              variables: {
                id: data?.storeEndereco.id,
                endereco: this.endereco,
                imovelId: data?.storeImovel.id,
              },
            })
            .then(() => {
              this.$emit("reload");
              this.$emit("close");
            });
        })
        .catch((e) => {
          this.isSubmitting = false;
        });
    },

    handleCep(cep: string) {
      if (cep && cep.length === 9) {
        this.loading.loadingCep = true;
        const localCep = cep.replace("-", "");

        axios
          .get<ViaCep>(`https://viacep.com.br/ws/${localCep}/json/`, {
            headers: {
              Accept: [
                "text/html",
                "application/xhtml+xml",
                "application/xml;q=0.9",
                "image/webp",
                "image/apng",
                "*/*;q=0.8",
                "application/signed-exchange;v=b3;q=0.9",
              ],
            },
          })
          .then(({ data }) => {
            const { logradouro, bairro, localidade, uf } = data;
            this.endereco.rua = logradouro;
            this.endereco.uf = uf;
            this.endereco.logradouro = logradouro;
            this.endereco.bairro = bairro;
            this.endereco.cidade = localidade;
          })
          .finally(() => {
            this.loading.loadingCep = false;
          });
      }
    },
  },
  created() {
    if (!this.isEditing) {
      this.loading.clientes = true;
      this.fetchClientes();
    }

    if (this.isEditing) {
      this.$apollo
        .query({
          query: GET_IMOVEL_ENDERECO,
          variables: {
            idImovel: this.idImovel,
            idEndereco: this.idEndereco,
          },
        })
        .then(({ data }) => {
          this.endereco = data.endereco;
          this.imovel = data.imovel;
          this.$delete(this.endereco, "__typename");
          this.$delete(this.imovel, "__typename");
        });
    }
  },
});
</script>

<style lang="scss" scoped>
@import '~vue-multiselect/dist/vue-multiselect.min.css';
</style>
