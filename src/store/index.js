import { createStore } from "vuex";
import user from "./user/user.js";
import database from "./database/database.js";
import storage from "./storage/storage.js";
import { vuexfireMutations } from "vuexfire";

export default createStore({
  modules: { user, database, storage },
  mutations: { ...vuexfireMutations },
});
