<template lang="pug">
  b-navbar(
    spaced
    type="is-white"
  )
    template(slot="brand")
      b-navbar-item(@click="$router.push({ path: '/'})")
        img(
          src="@/assets/logo.svg"
        )
    template(
      slot="end"
    )
      b-navbar-item(
        tag="router-link"
        to="/"
      )
        p Página inicial
      b-navbar-item(
        tag="router-link"
        to="/cadastro/imovel"
      )
        p Imóveis
      b-navbar-item(
        tag="router-link"
        to="/cadastro/cliente"
      )

        p Clientes
      b-navbar-item(
        tag="router-link"
        to="/cadastro/usuario"
      )
        p Usuários
      user
</template>

<script lang="ts">
import Vue from "vue";
import User from "./User.vue";

export default Vue.extend({
  components: {
    User,
  },
});
</script>

<style lang="scss" scoped>
$is-primary: #ef6235;

.router-link-exact-active {
  color: $is-primary;
  background-color: whitesmoke;
}
</style>
