import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseApp = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTHDOMAIN,
    projectId: process.env.VUE_APP_PROJECTID,
    storageBucket: process.env.VUE_APP_STORAGEBUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
    appId: process.env.VUE_APP_APPID,
    measurementId: process.env.VUE_APP_MEASUREMENTID,
  };
  
export default function install (Vue) {
    Object.defineProperty(Vue.prototype, '$firebase', {
        get () {
            return firebaseApp
        }
    })
}
