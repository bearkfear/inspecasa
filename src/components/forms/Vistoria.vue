<template>
  <div class="modal-card">
    <div class="modal-card-head">
      <div class="modal-card-title">
        <h1 class="title is-4">Criar vistoria</h1>
        <h2 class="subtitle is-6">Pontue o necessário e adicione mídias para corroborar</h2>
      </div>
    </div>
    <div class="modal-card-body">
      <form>
        <b-field label="Observação">
          <b-input type="text"></b-input>
        </b-field>
      </form>
    </div>
    <div class="modal-card-foot">
      <b-button>Fechar</b-button>
      <b-button>Salvar</b-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({

});
</script>
<style scoped>

</style>
