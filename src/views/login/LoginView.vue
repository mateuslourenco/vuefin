<template>
  <div class="container form-login">
    <form @submit.prevent="doLogin()">
      <div class="field">
        <label class="label">VueFin</label>
        <p class="control">
          <input
            class="input"
            type="email"
            placeholder="Email"
            required
            v-model="userPayload.email"
          />
        </p>
      </div>
      <div class="field">
        <p class="control">
          <input
            class="input"
            type="password"
            placeholder="Password"
            required
            v-model="userPayload.password"
          />
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button
            class="button is-success is-fullwidth"
            :class="{ 'is-loading disabble': this.IsConfirmButtonLoading }"
            :disabled="this.IsConfirmButtonLoading"
          >
            Login
          </button>
        </p>
      </div>
    </form>
    <v-snackbar v-model="showSnackbar" :timeout="4000">
      {{ text }}
      <template v-slot:actions>
        <v-btn
          :color="color"
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
export default {
  data: () => {
    return {
      showSnackbar: false,
      text: "",
      color: "",
      userPayload: { email: "", password: "" },
      IsConfirmButtonLoading: false,
    };
  },
  methods: {
    doLogin() {
      this.IsConfirmButtonLoading = true;
      this.$store.dispatch("user/Login", this.userPayload).then((resp) => {
        if (resp instanceof Error) {
          this.IsConfirmButtonLoading = false;
          this.text = "Login ou senha incorretos";
          this.color = "red";
          this.showSnackbar = true;
        } else {
          this.IsConfirmButtonLoading = false;
          this.$router.push({ name: "home" }).catch(() => {});
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
