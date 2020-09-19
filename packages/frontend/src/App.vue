<template lang="pug">
  #app
    Navbar(v-if="$route.meta.requireAuth")
    router-view
</template>

<script lang="ts">

import Navbar from "@/components/Navbar.vue";
import { Vue, Component } from "vue-property-decorator"
@Component({
  components: {
    Navbar,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import '@/styles/_global.scss';
</style>
