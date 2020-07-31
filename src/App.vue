<template>
  <div id="app">
    <!-- set progressbar -->
    <vue-progress-bar></vue-progress-bar>
    <Navbar v-if="$route.meta.requireAuth"></Navbar>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";

export default Vue.extend({
  components: {
    Navbar,
  },
  mounted() {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    // @ts-ignore
    this.$Progress.finish();
  },
  created() {
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
  }
});
</script>

<style lang="scss">
@import '@/styles/_global.scss';
$font-sans: Poppins
</style>
