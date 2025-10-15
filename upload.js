import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebaseConfig";

const storage = getStorage(app);
const fileRef = ref(storage, `documents/${userId}/idCard.jpg`);

await uploadBytes(fileRef, file);
const url = await getDownloadURL(fileRef);