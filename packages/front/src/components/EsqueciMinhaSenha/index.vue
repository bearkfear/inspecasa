<template lang="pug">
  b-button.mb-4(
    type="is-text"
    @click="openModal"
  ) Esqueci a senha
</template>

<script lang="ts">
import Vue from "vue";
import Modal from "./Modal.vue";

export default Vue.extend({
  methods: {
    openModal() {
      this.$buefy.modal.open({
        hasModalCard: true,
        component: Modal,
        parent: this,
      });
    }
  }
});
</script>
