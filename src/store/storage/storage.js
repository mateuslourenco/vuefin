import { storage } from "../../../firebase.config.js";

const actions = {
  SendImageToStorage(context, payload) {
    return storage
      .ref()
      .child(payload.path)
      .child(payload.fileName)
      .put(payload.object)
      .then((snapshot) => {
        return snapshot;
      });
  },
  GetImageDownloadURL(context, payload) {
    return storage.ref().child(payload).getDownloadURL();
  },
};

export default {
  namespaced: true,
  actions,
};
