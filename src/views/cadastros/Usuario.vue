<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="level">
          <div class="level-left">
            <h1 class="title is-3">Usuarios</h1>
          </div>
          <div class="level-right">
            <b-button
              icon-left="plus"
              type="is-primary"
              @click="handleAdicionar()"
              >Criar novo</b-button
            >
          </div>
        </div>
        <div class="table-container">
          <table class="table is-striped is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Email</th>
                <th>Bio</th>
                <th>Função</th>
                <th>Data Criação</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="loading">
                <tr v-for="(skl, i) in 10" :key="i">
                  <th v-for="(skll, inx) in 7" :key="inx">
                    <b-skeleton active animated width="100px"></b-skeleton>
                  </th>
                </tr>
              </template>
              <tr v-for="usuario in usuarios" :key="usuario.createdAt">
                <th>
                  <router-link
                    class="user-content"
                    :to="{ path: `/show/usuario/${usuario.id}` }"
                  >
                    <figure class="image is-48x48">
                      <img class="is-rounded" :src="usuario.urlImg" alt="" />
                    </figure>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;{{ usuario.nome }} {{ usuario.sobrenome }}</p>
                  </router-link>
                </th>
                <td>{{ usuario.email }}</td>
                <td>{{ usuario.bio }}</td>
                <td>{{ usuario.funcao }}</td>
                <td>
                  {{ new Date(Number(usuario.createdAt)).toLocaleString() }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <template v-if="!loading && usuarios.length <= 0">
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
import Vue from 'vue';
import ModalUsuario from '@/components/forms/Usuario.vue';
import gql from 'graphql-tag';

export default Vue.extend({
  name: 'usuario',
  data: () => ({
    usuarios: [],
    loading: false,
  }),
  methods: {
    handleAdicionar() {
      this.$buefy.modal.open({
        parent: this,
        hasModalCard: true,
        component: ModalUsuario,
        props: {},
        fullScreen: true,
        events: {
          reload: () => {
            this.fetchUsuarios();
          },
        },
      });
    },
    fetchUsuarios() {
      this.loading = true;
      this.$apollo
        .query({
          query: gql`
            query usuarios {
              usuarios {
                id
                nome
                sobrenome
                funcao
                email
                bio
                uid
                createdAt
                changedAt
                urlImg
              }
            }
          `,
        })
        .then(({ data }) => {
          this.loading = false;
          this.usuarios = data.usuarios;
        });
    },
  },
  created() {
    this.fetchUsuarios();
  },
});
</script>

<style lang="css" scoped>
.user-content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
