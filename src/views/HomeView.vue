<template>
  <div>
    <h1>Home</h1>
    {{ GetCurrentUser }}
    <v-btn @click="getData()"></v-btn>
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
  methods: {
    getData() {
      this.$store
        .dispatch("database/GetFromDatabase", this.GetCurrentUser.uid)
        .then((snapshot) => {
          console.log(snapshot);
        });
    },
  },
};
</script>
