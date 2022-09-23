<template>
  <div class="text-center">
    <v-snackbar v-model="snackbar" :timeout="notificationObject.timeout">
      {{ notificationObject.message }}
      <template v-slot:actions>
        <v-btn
          :color="notificationObject.color"
          variant="text"
          multi-line
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  props: {
    notificationObject: Object,
  },
  data: () => ({
    snackbar: true,
  }),
};
</script>
