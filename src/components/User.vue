<template>
  <b-navbar-item tag="div" class="is-paddingless">
    <b-dropdown position="is-bottom-left">
      <template slot="trigger">
        <b-navbar-item>
          <b-skeleton
            v-if="loading"
            active
            animated
            circle
            width="48px"
            height="48px"
          ></b-skeleton>
          <template v-else>
            <figure>
              <img class="user-img" :src="usuario.urlImg" />
            </figure>
            <b-icon icon="caret-down"></b-icon>
          </template>
        </b-navbar-item>
      </template>
      <b-dropdown-item :disabled="loading" has-link>
        <router-link
          :to="{
            path: `/show/usuario/${usuario && usuario.id}`,
          }"
        >
          <div class="media">
            <div class="media-left">
              <b-icon icon="user-cog"></b-icon>
            </div>
            <div class="media-content">
              <p>Perfil</p>
            </div>
          </div>
        </router-link>
      </b-dropdown-item>
      <b-dropdown-item @click="logoutUser()">
        <div class="media">
          <div class="media-left">
            <b-icon icon="power-off"></b-icon>
          </div>
          <div class="media-content"><p>Sair</p></div>
        </div>
      </b-dropdown-item>
    </b-dropdown>
  </b-navbar-item>
</template>

<script lang="ts">
import Vue from 'vue';
import { auth } from 'firebase/app';
import { GET_ME } from '@/queries';

export default Vue.extend({
  data: () => ({
    usuario: null,
    loading: false,
  }),
  methods: {
    logoutUser() {
      auth().signOut();
      localStorage.removeItem('token');
      this.$router.push({ path: '/auth' });
    },
    async fetchUser() {
      this.loading = true;
      const { data } = await this.$apollo.query({
        query: GET_ME,
      });
      this.usuario = data.me;
      this.loading = false;
    },
  },
  created() {
    this.loading = true;
    this.fetchUser();
  },
});
</script>

<style scoped>
.user-img {
  max-width: 40px;
  max-height: 40px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: 0 0 5px #ef6237;
  border: 1px solid transparent;
  background: linear-gradient(
    to left,
    #ef6237,
    #f83600
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
