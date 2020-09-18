<template lang="pug">
  div.modal-card
    .modal-card-head
      .modal-card-title Senha
    .modal-card-body
      b-field(
        label="E-mail"
      )
        b-input(
          v-model="email"
          type="email"
        )
    .modal-card-foot
      b-button(
        type="is-info"
      ) Envar email de recuperação
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    email: null,
  })
});
</script>
