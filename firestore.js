import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const addUser = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: "Chandika",
      email: "chandika@example.com"
    });
    console.log("User added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding user: ", e);
  }
};

