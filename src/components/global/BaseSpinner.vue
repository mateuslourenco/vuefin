<template>
  <div class="spinner">
    <v-progress-circular
      :size="50"
      color="amber"
      indeterminate
    ></v-progress-circular>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.spinner {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ccc;
  z-index: 1000;
}
</style>
