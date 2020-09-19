<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <div>
        <h1 class="modal-card-title">
          Histórico
        </h1>
        <p>Transações anteriores</p>
      </div>
    </header>
    <section class="modal-card-body">
      <div class="box">
        <h1 class="title is-6">{{ new Date().toLocaleString() }}</h1>
        <p>Vendedor: <router-link to="/show/usuario/1">Enrico</router-link></p>
        <p>Valor Proposto: R$: 300.000,00</p>
        <a href="">
          <figure class="image is-24x24">
            <img class="is-rounded" src="https://via.placeholder.com/500" />
          </figure>
        </a>
      </div>
    </section>
    <footer class="modal-card-foot">
      <div class="is-pulled-right">
        <b-button @click="$emit('close')">
          Fechar
        </b-button>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({

})
export default class Historico extends Vue { }
</script>
