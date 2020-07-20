<template>
  <div>
    <div class="level">
      <div class="level-left"></div>
      <div class="level-right">
        <b-button
        type="is-primary"
        icon-left="plus"
        @click="handleOpenForm()"
        >Adicionar</b-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Form from "../forms/Vistoria.vue";

export default Vue.extend({
  name: "Vistoria",
  methods: {
    handleOpenForm() {
      this.$buefy.modal.open({
        parent: this,
        component: Form,
        hasModalCard: true,
        fullScreen: true,
        events: {},
        props: {},
      });
    },
  },
});
</script>
<style scoped></style>
