<template>
  <div class="is-full has-text-centered">
    <button
      class="button are-large is-primary is-outlined"
      @click="openModal()"
    >
      <i class="mr-1 fa fa-plus"></i>
      Novo gasto
    </button>
    <form @submit.prevent="submit()">
      <div class="modal" :class="{ 'is-active': showModal }">
        <div class="modal-background"></div>
        <div class="modal-card">
          <BaseSpinner v-if="showSpinner" />
          <header class="modal-card-head">
            <p class="modal-card-title">Adicionar um novo gasto</p>
            <button
              type="button"
              class="delete"
              aria-label="close"
              @click="closeModal()"
            ></button>
          </header>
          <section class="modal-card-body">
            <div class="columns has-text-left">
              <div class="field column is-four-fifths">
                <label class="label">Descrição</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    required
                    v-model="form.description"
                  />
                </div>
              </div>
              <div class="field column">
                <label class="label">Valor (R$):</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    required
                    v-model="form.value"
                  />
                </div>
              </div>
            </div>
            <div>
              <div class="file has-name is-justify-content-center">
                <label class="file-label">
                  <input
                    class="file-input"
                    type="file"
                    accept="image/*"
                    @change="handleFile($event)"
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label"> Choose a file… </span>
                  </span>
                  <div class="is-flex" v-if="form.receipt">
                    <span class="file-name">
                      {{ form.receipt.name }}
                    </span>
                  </div>
                  <div v-else>
                    <span class="file-name"> No file uploaded </span>
                  </div>
                </label>
                <button
                  type="button"
                  class="ml-1 delete is-danger"
                  @click="form.receipt = ''"
                  v-if="form.receipt"
                ></button>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success">Incluir novo gasto</button>
            <button type="button" class="button" @click="closeModal()">
              Fechar
            </button>
          </footer>
        </div>
      </div>
    </form>
    <v-snackbar v-model="showSnackbar" :timeout="snackbarObject.timeout">
      {{ snackbarObject.text }}
      <template v-slot:actions>
        <v-btn
          :color="snackbarObject.color"
          variant="text"
          multi-line
          @click="showSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import BaseSpinner from "../global/BaseSpinner.vue";
export default {
  data: () => ({
    showSpinner: false,
    showModal: false,
    showSnackbar: false,
    form: {
      receipt: "",
      description: "",
      value: "",
    },
    snackbarObject: {
      text: "",
      timeout: 2000,
      color: "success",
    },
  }),
  computed: {
    GetCurrentUser() {
      return this.$store.getters["user/GetCurrentUser"];
    },
    fileName() {
      const { receipt } = this.form;
      if (receipt) {
        const split = receipt.name.split(".");
        return `${split[0]}-${new Date().getTime()}.${split[1]}`;
      } else {
        return "";
      }
    },
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      (this.form = {
        receipt: "",
        description: "",
        value: "",
      }),
        (this.showModal = false);
    },
    handleFile({ target }) {
      this.form.receipt = target.files[0];
    },
    async submit() {
      let path = this.GetCurrentUser.uid;
      let url = "";
      this.showSpinner = true;
      try {
        if (this.form.receipt) {
          const snapshot = await this.$store.dispatch(
            "storage/SendImageToStorage",
            {
              path: path,
              fileName: this.fileName,
              object: this.form.receipt,
            }
          );
          url = await this.$store.dispatch(
            "storage/GetImageDownloadURL",
            snapshot.metadata.fullPath
          );
        }
        let formObject = {
          id: "",
          ...this.form,
          receipt: url,
          createdAt: new Date().getTime(),
        };
        this.$store
          .dispatch("database/SetOnDatabase", {
            path: path,
            object: formObject,
          })
          .then(() => {
            let description = this.form.description;
            let value = this.form.value;
            this.showSpinner = false;
            this.closeModal();
            this.snackbarObject = {
              text: `Gasto: ${description} Valor: R$ ${value}`,
              timeout: 4000,
              color: "success",
            };
            this.showSnackbar = true;
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
  components: { BaseSpinner },
};
</script>

<style></style>
