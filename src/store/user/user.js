import firebase from "../../../firebase.config.js";
import { database } from "../../../firebase.config.js";

const state = {
  IsAnyoneLoggedIn: false,
  CurrentUser: {
    email: "",
    uid: "",
  },
};

const getters = {
  GetCurrentUser(state) {
    //Return current logged in user.
    return state.CurrentUser;
  },
  GetIsAnyoneLoggedIn(state) {
    return state.IsAnyoneLoggedIn;
  },
};

const mutations = {
  LOGIN(state, user) {
    state.IsAnyoneLoggedIn = true;
    state.CurrentUser = {
      email: user.email,
      uid: user.uid,
    };
  },
  LOGOUT(state) {
    //Clear use object from store.
    state.IsAnyoneLoggedIn = false;
    state.CurrentUser = {
      email: "",
      uid: "",
    };
  },
};

const actions = {
  //Action called only once when user attempts to login. Takes a user object with email and password as a parameter.
  Login({ state }, payload) {
    if (state.IsAnyoneLoggedIn) return; //Cancel login if user is somehow logged in.
    return firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password); //Use Firebase Auth method to login user with given email and password.
  },
  //This action is called by firebase.auth.js everytime there's a change on user's firebase token.
  //Used to bind a user to its livestream and populate state with user information.
  //Takes a user object from Firebase Auth as a parameter.
  RefreshLogin({ commit }, payload) {
    //Refreshes user's Firebase token to get its lastest information and get access to claims.
    let userObject = { email: payload.email, uid: payload.uid };
    commit("LOGIN", userObject); //Commit Firebase Auth user object to populate store state in mutation.
  },
  Logout({ commit }) {
    database.goOffline();
    database.goOnline();
    firebase
      .auth()
      .signOut() //Use Firebase Auth method to logout user.
      .then(() => {
        commit("LOGOUT");
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
