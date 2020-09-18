<template lang="pug">
    section.section
      .container
        .level
          .level-left
            h1.title.is-3 Usuarios
          .level-right
            b-button(
              icon-left="plus",
              type="is-primary",
              @click="handleAdicionar()",
              outlined
            ) Criar novo
        div.columns
          .column.is-3(v-for="(usuario, i) in usuarios" :key="i")
            router-link(:to="`/show/usuario/${usuario.id}`").box.px-6.py-5
              center.mb-2
                figure.image.is-96x96
                  img.is-rounded(:src="usuario.urlImg", alt)

              h1.title.is-5.has-text-centered.has-text-primary.
               {{ usuario.nome }} {{ usuario.sobrenome }}

              b-tag Email: {{ usuario.email }}
              b-tag Função: {{ usuario.funcao }}
        template(v-if="!loading && usuarios.length <= 0")
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
