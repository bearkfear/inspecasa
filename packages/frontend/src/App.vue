<template lang="pug">
  #app
    Navbar(v-if="$route.meta.requireAuth")
    router-view
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";

export default Vue.extend({
  components: {
    Navbar,
  },
});
</script>

<style lang="scss">
@import '@/styles/_global.scss';
</style>
