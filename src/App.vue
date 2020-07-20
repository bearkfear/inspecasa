<template>
  <div id="app">
    <Navbar v-if="$route.meta.requireAuth"></Navbar>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from '@/components/Navbar.vue';

export default Vue.extend({
  components: {
    Navbar
  }
});
</script>

<style lang="scss">
@import "@/styles/_global.scss";
</style>
