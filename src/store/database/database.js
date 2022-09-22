import app from "../../../firebase.config.js";
import { getDatabase, ref, set, push, child } from "firebase/database";

const database = getDatabase(app);

const actions = {
  SetOnDatabase(context, payload) {
    const newPostKey = push(child(ref(database), payload.path)).key;
    payload.object.id = newPostKey;
    return set(ref(database, payload.path + "/" + newPostKey), payload.object);
  },

  GetFromDatabase(context, payload) {
    return database
      .ref(payload.path)
      .once("value")
      .then((snapshot) => {
        return payload.returnSnapshotVal ? snapshot.val() : snapshot; //Returns either snapshot's value or its entire object.
      });
  },

  GetLimitedFromDatabase(context, payload) {
    return database
      .ref(payload.path)
      .limitToLast(payload.limit)
      .once("value")
      .then((snapshot) => {
        return payload.returnSnapshotVal ? snapshot.val() : snapshot; //Returns either snapshot's value or its entire object.
      });
  },
};

export default {
  namespaced: true,
  actions,
};
