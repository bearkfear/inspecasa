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
        @click="$emit('delete')"
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
import * as firebase from "firebase/app";
import uuid from "uuid-random";

const storage = firebase.storage().ref();
interface Data {
  isUploading: boolean;
}

export default Vue.extend({
  name: "file-to-upload",
  props: {
    file: {
      type: Object as () => FileToUpload,
    },
  },
  data: () => ({
    isUploading: false,
  }),

  methods: {
    handleStartUpload() {
      this.isUploading = true;
      this.$emit("update:progress", 1);
      const uploadRef = storage
        .child(`imoveis/midias/${uuid()}`)
        .put(this.file.archive);
      uploadRef.on(
        "state_changed",
        ({ bytesTransferred, totalBytes }) => {
          const p = (bytesTransferred / totalBytes) * 100;
          this.$emit("update:progress", p);
        },
        () => {
          this.$emit("delete");
        },
        () => {
          uploadRef.snapshot.ref.getDownloadURL().then((url: string) => {
            eventBus.$emit(TYPES.ADD_UPLOADED_MIDIA_TO_VISTORIA, {
              url,
              descricao: this.file.description,
              extensao: this.file.extension,
            });
            this.$emit("delete");
          });
        }
      );
    },
  },
  mounted() {
    eventBus.$on(TYPES.START_UPLOAD_MIDIAS_VISTORIA, () => {
      if (!this.isUploading) {
        this.handleStartUpload();
      }
    });
  },
});
</script>
