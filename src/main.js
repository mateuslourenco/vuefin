import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FirebaseVue from './firebase'
const app = createApp(App);

app.use(store);
app.use(router);
app.use(FirebaseVue)
app.mount("#app");
