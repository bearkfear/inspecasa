<template>
  <div class="columns is-multiline is-narrow">
    <div v-for="list in midias" :key="list.id" class="column is-2">
      <figure v-if="list.extensao === '.mp4'">
        <video class="image is-128x128" controls :src="list.url" />
      </figure>

      <figure v-else class="image is-128x128">
        <img :src="list.url" />
      </figure>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

interface Data {
  current: number;
}

export default Vue.extend({
  name: "ListaDeMas",
  props: ["midias"],
  data: (): Data => ({
    current: 0,
  }),
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px 0;
}

.card-custom {
  margin: 10px;
}
</style>
