import { signOut } from "firebase/auth";
import { auth } from "./config"; // make sure this points to your firebase config

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
