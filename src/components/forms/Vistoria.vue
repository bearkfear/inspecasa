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
        <b-input type="text" v-model="observacao"></b-input>
      </b-field>
      <hr />
      <h3 class="title is-5">Mídias</h3>
      <Midia ref="midiaRef"></Midia>
    </div>

    <div class="modal-card-foot">
      <b-button @click="handleClose()">Cancelar</b-button>
      <b-button @click="handleSave()" type="is-success">Salvar</b-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { ADD_VISTORIA } from "@/queries/vistoria";
import Midia from "../vistoria/midias/Midia.vue";

interface Data {
  observacao: string | null;
}

export default Vue.extend({
  components: {
    Midia,
  },
  data: (): Data => ({
    observacao: null,
  }),
  methods: {
    handleSave() {
      const filesUploading = this.$refs.midiaRef.files;

      if (filesUploading.length > 0) {
        this.$buefy.dialog.alert({
          message: "Aguarde o termino dos uploads!"
        });
      }

      if (this.observacao == null || this.observacao === "") {
        this.$buefy.dialog.alert("Precisa preencher o campo de observação");
        return;
      }

      const { midias } = this.$refs.midiaRef;

      this.$apollo.mutate({
        mutation: ADD_VISTORIA,
        variables: {
          imovelId: Number(this.$route.params.id),
          vistoriaInput: {
            observacao: this.observacao,
            midias,
          },
        }
      }).then(({ data }) => {
        this.$emit("close");
      });
    },
    handleClose(): void {
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
    },
  },
});
</script>
<style scoped></style>
