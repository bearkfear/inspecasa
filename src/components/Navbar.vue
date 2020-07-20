<template>
  <b-navbar shadow>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="@/assets/logo.svg" alt="Logo da empresa Inspecasa" />
      </b-navbar-item>
    </template>

    <template slot="start" v-if="$route.meta.requireAuth">
      <b-navbar-item tag="router-link" to="/cadastro/cliente">
        <div class="media">
          <div class="media-left">
            <b-icon icon="user-tie"></b-icon>
          </div>
          <div class="media-content">
            <p>Clientes</p>
          </div>
        </div>
      </b-navbar-item>
      <b-navbar-item tag="router-link" to="/cadastro/imovel">
        <div class="media">
          <div class="media-left">
            <b-icon icon="house-damage"></b-icon>
          </div>
          <div class="media-content">
            <p>Imóveis</p>
          </div>
        </div>
      </b-navbar-item>

      <b-navbar-item tag="router-link" to="/cadastro/usuario">
        <div class="media">
          <div class="media-left">
            <b-icon icon="users"></b-icon>
          </div>
          <div class="media-content">
            <p>Usuários</p>
          </div>
        </div>
      </b-navbar-item>
    </template>

    <template slot="end" v-if="$route.meta.requireAuth">
      <User></User>
    </template>
  </b-navbar>
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

<style lang="sass" scoped></style>
