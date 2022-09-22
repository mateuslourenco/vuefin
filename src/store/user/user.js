import app from "../../../firebase.config.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
  Login(context, payload) {
    return signInWithEmailAndPassword(
      getAuth(app),
      payload.email,
      payload.password
    )
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  },
  //This action is called by firebase.auth.js everytime there's a change on user's firebase token.
  //Used to bind a user to its livestream and populate state with user information.
  //Takes a user object from Firebase Auth as a parameter.
  RefreshLogin({ commit }, payload) {
    //Refreshes user's Firebase token to get its lastest information and get access to claims.
    let userObject = { email: payload.email, uid: payload.uid };
    commit("LOGIN", userObject); //Commit Firebase Auth user object to populate store state in mutation.
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
