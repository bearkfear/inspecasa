<template lang="pug">
  b-button(
    icon-left="handshake"
    type="is-success"
    @click="openModal()"
    :disabled="disabled"
  ) Vender
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Modal from "./modal.vue";

@Component
export default class VenderImovel extends Vue {
  private disabled = false;

  openModal(): void {
    this.disabled = true;
    this.$buefy.modal.open({
      parent: this,
      component: Modal,
      hasModalCard: true,
      fullScreen: true,
      onCancel: () => {
        this.disabled = false;
      },
      events: {
        close: () => {
          this.disabled = false;
        },
        success: () => { 
          this.$emit('update');
        }
      },
    });
  }
}
</script>
