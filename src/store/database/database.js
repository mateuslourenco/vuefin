import { database } from "../../../firebase.config.js"; //Import firebase's realtime database instance so it's possible to push to and retrieve from it.

const actions = {
  SetOnDatabase(context, payload) {
    const ref = database.ref(payload.path);
    const id = ref.push().key;
    payload.object.id = id;
    return ref.child(id).set(payload.object);
  },

  GetFromDatabase(context, payload) {
    return database
      .ref(payload.path)
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
