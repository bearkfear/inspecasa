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
import { ADD_MIDIA } from "@/queries/midia";
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
            this.$apollo
              .mutate({
                mutation: ADD_MIDIA,
                variables: {
                  midia: {
                    url,
                    descricao: this.file.description,
                    extensao: this.file.extension,
                  },
                  imovelId: this.$route.params.id
                },
              })
              .then(() => {
                eventBus.$emit(TYPES.REFRESH_LIST_MIDIAS);
                this.$emit("delete");
              });
          });
        }
      );
    },
  },
  mounted() {
    eventBus.$on(TYPES.START_UPLOAD, () => {
      if (!this.isUploading) {
        this.handleStartUpload();
      }
    });
  },
});
</script>
