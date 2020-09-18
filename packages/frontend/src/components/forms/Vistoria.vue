<template>
  <div class="modal-card">
    <div class="modal-card-head">
      <div class="modal-card-title">
        <h1 class="title is-4">Criar vistoria</h1>
        <h2 class="subtitle is-6">
          Pontue o necessário e adicione mídias para corroborar
        </h2>
      </div>
    </div>
    <div class="modal-card-body">
      <b-field label="Observação">
        <ckeditor
          v-model="observacao"
          :editor="editor"
          :config="config"
        ></ckeditor>
      </b-field>
      <hr />
      <h3 class="title is-5">Mídias</h3>
      <Midia ref="midiaRef"></Midia>
    </div>

    <div class="modal-card-foot">
      <b-button @click="handleClose()">Cancelar</b-button>
      <b-button
        @click="handleSave()"
        type="is-success"
        :disabled="loading"
        :loading="loading"
        >Salvar</b-button
      >
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { ADD_VISTORIA } from "@/queries/vistoria";
import eventBus, { TYPES } from "@/eventBus";
import CKEDITOR_CONFIG from "@/constants";
// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Midia from "../vistoria/midias/Midia.vue";

interface Data {
  observacao: string | null;
  loading: boolean;
  editor: typeof ClassicEditor;
  config: typeof CKEDITOR_CONFIG;
}

export default Vue.extend({
  components: {
    Midia,
  },
  data: (): Data => ({
    observacao: "",
    loading: false,
    editor: ClassicEditor,
    config: CKEDITOR_CONFIG,
  }),
  methods: {
    handleSave() {
      // @ts-ignore
      const filesUploading = this.$refs.midiaRef.files;

      if (filesUploading.length > 0) {
        this.$buefy.snackbar.open({
          message: "Aguarde o termino dos uploads!",
          actionText: null,
        });
        return;
      }

      if (this.observacao == null || this.observacao === "") {
        this.$buefy.snackbar.open({
          message: "Precisa preencher o campo de observação",
          actionText: null,
        });
        return;
      }

      this.loading = true;
      // @ts-ignore
      const { midias } = this.$refs.midiaRef;

      this.$apollo
        .mutate({
          mutation: ADD_VISTORIA,
          variables: {
            imovelId: Number(this.$route.params.id),
            vistoriaInput: {
              observacao: this.observacao,
              midias,
            },
          },
        })
        .then(() => {
          eventBus.$emit(TYPES.REFRESH_LIST_VISTORIAS);
          this.$emit("close");
        })
        .catch(() => {
          this.$buefy.snackbar.open({
            message: "Não foi possível salvar os dados!",
            type: "is-danger",
          });
        }).finally(() => { this.loading = false; });
    },
    handleClose(): void {
      if (!this.loading) {
        this.$emit("close");
      } else {
        this.$buefy.dialog.confirm({
          message:
            "Você tem certeza que deseja sair? se sim, perderá todos os dados inseridos!",
          confirmText: "Sair",
          type: "is-danger",
          cancelText: "Ficar",
          onConfirm: () => {
            this.$emit("close");
          },
        });
      }
    },
  },
});
</script>
<style scoped></style>
