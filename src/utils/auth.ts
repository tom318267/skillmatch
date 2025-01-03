import { auth } from "../config/firebase.ts";
import { signOut } from "firebase/auth";
import { NavigateFunction } from "react-router-dom";

export const handleSignOut = async (navigate: NavigateFunction) => {
  try {
    await signOut(auth);
    navigate("/"); // Redirect to homepage
    return { success: true };
  } catch (error) {
    console.error("Error signing out:", error);
    return { success: false, error };
  }
};
