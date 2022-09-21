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
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      userPayload: { email: "", password: "" },
      IsConfirmButtonLoading: false,
    };
  },
  methods: {
    doLogin() {
      this.IsConfirmButtonLoading = true;
      this.$store.dispatch("user/Login", this.userPayload).then(() => {
        this.IsConfirmButtonLoading = false;
        this.$router.push({ name: "home" }).catch(() => {});
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
