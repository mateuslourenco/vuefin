<template>
  <div class="menu-list btn-logout" @click="logout()">Sair</div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$store.dispatch("user/Logout");

      this.$router.push({ name: "login" });
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-logout {
  color: white;
  cursor: pointer;
  &:hover {
    color: orange;
  }
}
</style>
