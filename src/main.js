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

loadFonts();
dom.watch();
library.add(fas, far, fab);

const app = createApp(App);

app.use(store);
app.use(database);
app.use(router);
app.use(vuetify);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
