<template>
  <div class="home">
    <h1>Home</h1>
    {{ GetCurrentUser }}
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  computed: {
    GetCurrentUser() {
      return this.$store.getters["user/GetCurrentUser"];
    },
  },
};
</script>
