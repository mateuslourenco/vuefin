import { createStore } from "vuex";
import user from "./user/user.js";
import database from "./database/database.js";
import storage from "./storage/storage.js";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { user, database, storage },
});
