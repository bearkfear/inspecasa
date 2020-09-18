<template lang="pug">
  b-navbar-item(
    tag="div"
  ).is-paddingless
    b-dropdown(
      position="is-bottom-left"
    )
      template(slot="trigger")
        b-navbar-item
          b-skeleton(
            v-if="loading"
            active
            animated
            circle
            width="48px"
            height="48px"
          )
          template(v-else)
            figure
              img(:src="usuario.urlImg").user-img
            b-icon(icon="caret-down")

      b-dropdown-item(
        :disabled="loading"
        has-link
      )
        router-link(:to="`/show/usuario/${usuario.id}`")
          .media
            .media-left
              b-icon(icon="user-cog")
            .media-content
              p Perfil
      b-dropdown-item(@click="logoutUser()")
        .media
          .media-left
            b-icon(icon="power-off")
          .media-content
            p Sair
</template>

<script lang="ts">
import Vue from "vue";
import { auth } from "firebase/app";
import { mapState } from "vuex";
import AuthState from "@/store/modules/auth/types";

export default Vue.extend({
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapState<{ auth: AuthState }>({
      usuario: (state: any) => state.auth.user,
    }),
  },
  methods: {
    logoutUser() {
      auth().signOut();
      localStorage.removeItem("token");
      this.$router.push({ path: "/auth" });
    },
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
