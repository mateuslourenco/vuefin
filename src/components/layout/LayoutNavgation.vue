<template>
  <aside
    class="menu nav is-flex is-flex-direction-column is-justify-content-space-between"
  >
    <div>
      <p class="menu-label has-text-centered">VueFin</p>
      <ul class="menu-list">
        <router-link
          :key="i"
          exact-active-class="active"
          class="nav-link"
          :to="{ name: router.name }"
          v-for="(router, i) in routerLinks"
        >
          <i class="fas" :class="`fa-${router.meta.icon}`"></i>
          {{ router.meta.title }}
        </router-link>
        <hr />
        <LayoutNewExpense></LayoutNewExpense>
      </ul>
    </div>
    <div class="has-text-centered">
      <LayoutLogout></LayoutLogout>
    </div>
  </aside>
</template>

<script>
import LayoutLogout from "./LayoutLogout.vue";
import LayoutNewExpense from "./LayoutNewExpense.vue";
export default {
  components: {
    LayoutLogout,
    LayoutNewExpense,
  },
  computed: {
    routerLinks() {
      return this.$router.options.routes.filter((r) => r.name != "login");
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  height: calc(100vh - 12px);
  width: calc(100% + 12px);
  .nav-link {
    transition: 0.4s;
    &.active {
      color: orange;
    }
    &:hover {
      color: black;
    }
  }
}
</style>
>
