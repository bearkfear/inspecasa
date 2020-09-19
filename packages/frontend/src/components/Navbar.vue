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

import User from "./User.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    User,
  },
})
export default class Navbar extends Vue {}
</script>

<style lang="scss" scoped>
$is-primary: #ef6235;

.router-link-exact-active {
  color: $is-primary;
  background-color: whitesmoke;
}
</style>
