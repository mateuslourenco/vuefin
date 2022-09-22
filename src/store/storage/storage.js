import app from "../../../firebase.config.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage(app);

const actions = {
  SendImageToStorage(context, payload) {
    const storageRef = ref(storage, payload.path + "/" + payload.fileName);
    return uploadBytes(storageRef, payload.object).then((snapshot) => {
      return snapshot;
    });
  },
  GetImageDownloadURL(context, payload) {
    return getDownloadURL(ref(storage, payload));
  },
};

export default {
  namespaced: true,
  actions,
};
