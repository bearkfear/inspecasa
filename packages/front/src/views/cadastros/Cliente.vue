<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="level">
          <div class="level-left">
            <h1 class="title is-3">Clientes</h1>
          </div>
          <div class="level-rigth">
            <b-button
              icon-left="plus"
              type="is-primary"
              @click="handleAdicionar()"
              outlined
              >Criar novo</b-button
            >
          </div>
        </div>
        <table class="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th width="20%">Cliente</th>
              <th>Email</th>
              <th>Bio</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="loading">
              <tr v-for="(skl, i) in 10" :key="i">
                <th v-for="(skll, inx) in 6" :key="inx">
                  <b-skeleton active animated width="100px"></b-skeleton>
                </th>
              </tr>
            </template>
            <tr v-for="cliente in clientes" :key="cliente.createdAt">
              <th>
                <router-link
                  class="user-content"
                  :to="{ path: `/show/cliente/${cliente.id}` }"
                >
                  <div>
                    <figure class="image is-square is-48x48">
                      <img class="is-rounded" :src="cliente.urlImg" />
                    </figure>
                  </div>
                  <p class="pd">
                    {{ cliente.nome }}
                    {{ cliente.sobrenome }}
                  </p>
                </router-link>
              </th>
              <td>{{ cliente.email }}</td>
              <td>{{ cliente.bio }}</td>
            </tr>
          </tbody>
        </table>
        <template v-if="!loading && clientes.length === 0">
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
import { GET_CLIENTES } from "@/queries/cliente";
import ModalCliente from "@/components/forms/Cliente.vue";

export default Vue.extend({
  name: "cliente",
  data: () => ({
    clientes: [],
    loading: false,
  }),
  methods: {
    handleAdicionar() {
      this.$buefy.modal.open({
        parent: this,
        hasModalCard: true,
        component: ModalCliente,
        props: {},
        fullScreen: true,
        events: {
          reload: () => {
            this.fetchClientes();
          },
        },
      });
    },
    fetchClientes() {
      this.loading = true;
      this.$apollo
        .query({
          query: GET_CLIENTES,
        })
        .then(({ data }) => {
          this.clientes = data.clientes;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  created() {
    this.fetchClientes();
  },
});
</script>
<style lang="scss" scoped>
.user-content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: flex-start;
}
.pd {
  margin-left: 10px;
}
</style>
