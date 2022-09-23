<template>
  <div>
    <div class="columns">
      <div class="column is-2 navigation-sidebar" v-if="GetIsAnyoneLoggedIn">
        <LayoutNavgation />
      </div>
      <div class="column">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import LayoutNavgation from "./components/layout/LayoutNavgation.vue";

export default {
  name: "App",
  components: {
    LayoutNavgation,
  },
  computed: {
    GetIsAnyoneLoggedIn() {
      return this.$store.getters["user/GetIsAnyoneLoggedIn"];
    },
  },
};
</script>

<style lang="scss">
$menu-label-font-size: 2em;
$menu-label-color: white;
$menu-item-color: white;
$modal-content-width: 50vw !default;
@import "~bulma";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .navigation-sidebar {
    background-color: #2c3e50;
  }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
