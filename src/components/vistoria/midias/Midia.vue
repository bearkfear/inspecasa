<template>
  <div>
    <div>
      <b-field>
        <b-upload
          v-model="tempFiles"
          multiple
          drag-drop
          expanded
          @input="handleLoadFiles($event)"
        >
          <div class="content has-text-centered">
            <b-icon icon="upload" size="is-small"></b-icon>&nbsp;Solte seus
            arquivos aqui ou clique para selecionar
          </div>
        </b-upload>
      </b-field>
    </div>
      <hr />
    <div v-if="files.length > 0">
      <table class="table is-striped is-hoverable is-fullwidth is-narrow">
        <thead>
          <tr>
            <th width="10%">Progresso</th>
            <th>Descrição</th>
            <th width="1%">Ações</th>
          </tr>
        </thead>
        <tbody>
          <File
            v-for="(file, i) in files"
            :file="file"
            :key="file.id"
            @delete="handleRemoverFromUpload(i)"
            @update:progress="file.progress = $event"
          ></File>
        </tbody>
      </table>
      <div class="level">
        <div class="level-left"></div>
        <div class="level-right">
          <b-button
            icon-right="paper-plane"
            type="is-success"
            @click="handleStartUploads()"
            :disabled="disableEnviar"
          >
            Enviar
          </b-button>
        </div>
      </div>
      <hr />
    </div>

    <List :midias="midias"></List>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FileToUpload } from "@/types";
import eventBus, { TYPES } from "@/eventBus";
import uuid from "uuid-random";
import File from "./FileToUpload.vue";
import List from "./List.vue";

interface Midia {
  id: number;
  extensao: string;
  descricao: string;
  url: string;
  createdAt: string;
  changedAt: string;
}

interface Data {
  tempFiles: File[];
  files: FileToUpload[];
  midias: Partial<Midia>[];
  disableEnviar: boolean;
}

export default Vue.extend({
  name: "midia",

  data: (): Data => ({
    tempFiles: [],
    files: [],
    midias: [],
    disableEnviar: false,
  }),
  components: {
    File,
    List,
  },
  methods: {
    handleStartUploads() {
      eventBus.$emit(TYPES.START_UPLOAD_MIDIAS_VISTORIA);
    },
    handleLoadFiles(files: File[]) {
      const tempFiles: FileToUpload[] = [];
      files.forEach((f) => {
        const cut = f.name.split(".");
        const extension = cut[cut.length - 1];
        if (extension) {
          tempFiles.push({
            id: uuid(),
            progress: 0,
            description: f.name,
            archive: f,
            extension: `.${extension}`,
          });
        }
      });

      this.files.push(...tempFiles);
      this.tempFiles = [];
    },
    handleRemoverFromUpload(index: number) {
      this.files.splice(index, 1);
    },
  },
  created() {
    eventBus.$on(
      TYPES.ADD_UPLOADED_MIDIA_TO_VISTORIA,
      (midia: Partial<Midia>) => {
        this.midias.push(midia);
      }
    );
  },
});
</script>
