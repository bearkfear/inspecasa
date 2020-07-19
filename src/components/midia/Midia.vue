<template>
  <div>
    <div v-if="files.length >= 0">
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Progresso</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in files" :key="file.name">
            <td><b-progress></b-progress></td>
            <td>
              <b-field>
                <b-input type="text" :placeholder="file.name"></b-input>
              </b-field>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="level">
        <div class="level-left"></div>
        <div class="level-right">
          <b-button icon-right="paper-plane" type="is-success"
            >Enviar</b-button
          >
        </div>
      </div>
      <hr>
    </div>
    <div>
      <b-field>
        <b-upload v-model="files" multiple drag-drop expanded>
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload" size="is-medium"></b-icon>
            </p>
            <p>Solte seus arquivos aqui ou clique para selecionar</p>
          </div>
        </b-upload>
      </b-field>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'midia',
  data: () => ({
    files: [],
  }),
});
</script>
