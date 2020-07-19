<template>
  <tr>
    <td><b-progress :value="file.progress"></b-progress></td>
    <td>
      <b-field>
        <b-input
          type="text"
          placeholder="Adicione um contexto"
          v-model="file.description"
          size="is-small"
          :disabled="isUploading"
        ></b-input>
      </b-field>
    </td>
    <td>
      <b-button
        icon-left="trash"
        type="is-danger"
        @click="handleRemoverFromUpload(i)"
        size="is-small"
        :disabled="isUploading"
      ></b-button>
    </td>
  </tr>
</template>

<script lang="ts">
import { FileToUpload } from "@/types";
import eventBus, { TYPES } from "@/eventBus";
import Vue from "vue";

interface Data {
  isUploading: boolean
}

export default Vue.extend({
  name: "file-to-upload",
  props: {
    file: {
      type: Object as () => FileToUpload
    }
  },
  data: () => ({
    isUploading: false,
  }),

  methods: {
    handleStartUpload() {
      this.isUploading = true;
      console.log("iniciando o upload");
    }
  },
  mounted() {
    eventBus.$on(TYPES.START_UPLOAD, () => {
      this.handleStartUpload();
    });
  },
});
</script>
