import store from "./src/store/index.js"; //Import store so it is possible to dispatch actions and commit mutations from here.
import app from "./firebase.config.js"; //Import firebase so it is possible to use Auth methods.
import { getAuth } from "firebase/auth";
//Add an observer for changes on user's login state. Called everytime it observes a user is logged in/out.
//Incase user refreshes the page this function is called to look for a jwt on browser's local storage.
getAuth(app).onAuthStateChanged((user) => {
  if (user) {
    store.dispatch("user/RefreshLogin", user);
  }
  //If it finds a valid logged in user, dispatches action to store to maintain their login.
  else store.commit("user/LOGOUT"); //If it doesn't find a valid logged in user, commit mutation on store to clear all their data.
});
//Firebase's function to get current logged in user hacked to return it as a promise with either user or null.
//Hacked this way so there isn't a race condition between getCurrentUser() and Firebase's auth system.
app.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    //Returns promise with either user or null.
    const unsubscribe = getAuth(app).onAuthStateChanged((user) => {
      //Observes for changes on user's login state, same as function up above.
      unsubscribe(); //Unsubscribe for changes on user's login state so it doesn't overlap with function up above.
      resolve(user); //Resolve promise with result from onAuthStateChanged observer.
    }, reject); //Reject promise with null.
  });
};
