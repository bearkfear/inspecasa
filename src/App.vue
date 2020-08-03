<template>
  <div id="app">
    <template v-if="isLoading">
      <b-loading active :is-full-page="true"></b-loading>
    </template>
    <template v-else>
      <vue-progress-bar></vue-progress-bar>
      <Navbar v-if="$route.meta.requireAuth"></Navbar>
      <transition name="fade">
        <router-view />
      </transition>
    </template>
    <!-- set progressbar -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
import firebase from "firebase/app";

interface Data {
  tokenListener: firebase.Unsubscribe | undefined;
  isLoading: boolean;
}

export default Vue.extend({
  components: {
    Navbar,
  },
  data: (): Data => ({
    tokenListener: undefined,
    isLoading: false,
  }),
  created() {
    this.isLoading = true;
    this.tokenListener = firebase.auth().onIdTokenChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((result) => {
          localStorage.setItem("token", result.token);
          this.isLoading = false;
        });
      } else {
        this.isLoading = false;
      }
    });

    //  [App.vue specific] When App.vue is first loaded start the progress bar
    // @ts-ignore
    this.$Progress.start();
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        const meta = to.meta.progress;
        // parse meta tags
        // @ts-ignore
        this.$Progress.parseMeta(meta);
      }
      //  start the progress bar
      // @ts-ignore
      this.$Progress.start();
      //  continue to next page
      next();
    });
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach(() => {
      //  finish the progress bar
      // @ts-ignore
      this.$Progress.finish();
    });
  },
  mounted() {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    // @ts-ignore
    this.$Progress.finish();
  },
  beforeDestroy() {
    if (this.tokenListener) {
      this.tokenListener();
    }
  },
});
</script>

<style lang="scss">
@import '@/styles/_global.scss';
</style>
