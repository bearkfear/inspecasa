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
              outlined
              >Criar novo</b-button
            >
          </div>
        </div>
        <section>
          <div
            class="box hover-click"
            v-for="(usuario, i) in usuarios"
            :key="i"
            @click="$router.push({ path: `/show/usuario/${usuario.id}` })"
          >
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img class="is-rounded" :src="usuario.urlImg" alt="" />
                </figure>
              </div>
              <div class="media-content">
                <h1 class="title is-5">
                  {{ usuario.nome }} {{ usuario.sobrenome }}
                </h1>
                <p>{{ usuario.email }}</p>
                <p>{{ usuario.funcao }}</p>
              </div>
            </div>
          </div>
        </section>
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
import Vue from "vue";
import ModalUsuario from "@/components/forms/Usuario.vue";
import gql from "graphql-tag";

export default Vue.extend({
  name: "usuario",
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

<style lang="scss" scoped>
.user-content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.hover-click {
  transition-duration: .3s;
  cursor: pointer;

}

.hover-click:hover {
  box-shadow: 0 0 6px #ef6327;
}

</style>
