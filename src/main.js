import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import database from "./store/database/database";
import "../firebase.auth.js";

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import moment from "moment";

loadFonts();
dom.watch();
library.add(fas, far, fab);

const app = createApp(App);

app.directive("money-format", (el, { value }) => {
  el.innerHTML = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
    minimumFractionDigits: 2,
  }).format(value || 0);
});

app.directive("date-format", (el, { value }) => {
  el.innerHTML = moment(value).format("DD/MM/YYYY [às] HH:mm:ss");
});

app.use(store);
app.use(database);
app.use(router);
app.use(vuetify);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
