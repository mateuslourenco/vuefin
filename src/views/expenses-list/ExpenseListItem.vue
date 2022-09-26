<template>
  <div class="expense-list-item columns">
    <div class="column is-four-fifths">
      <div>{{ data.description }}</div>
      <small v-date-format="data.createdAt"></small>
    </div>
    <div class="column is-one-fifth" v-money-format="data.value"></div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
};
</script>

<style lang="scss" scoped>
.expense-list-item {
  border-bottom: 1px solid #ccc;
}
</style>
>
