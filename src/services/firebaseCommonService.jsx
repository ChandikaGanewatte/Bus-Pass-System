import {
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  getDocs,
  query,
  doc, updateDoc
} from "firebase/firestore";
import { db } from "../firebase/config";

// submit complains -----------------------------------------
export const submitComplaint = async ({ userId, depot, reason, message }) => {
  try {
    const complaintsRef = collection(db, "complaints");

    await addDoc(complaintsRef, {
      userId,
      depot,
      reason,
      message: message || "",
      status: "Pending",
      createdAt: serverTimestamp(),
    });

    return { success: true, message: "Complaint submitted successfully" };
  } catch (error) {
    console.error("Error submitting complaint:", error);
    return { success: false, message: error.message };
  }
};

// get complains ---------------------------------------------
export const getComplaints = async () => {
  try {
    const complaintsRef = collection(db, "complaints");
    const q = query(complaintsRef, orderBy("createdAt", "desc")); // latest first

    const querySnapshot = await getDocs(q);
    const complaints = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { success: true, data: complaints };
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return { success: false, message: error.message };
  }
};

// update complain --------------------------------------------
export const updateComplaintStatus = async (complaintId, newStatus) => {
  try {
    const complaintRef = doc(db, "complaints", complaintId);

    await updateDoc(complaintRef, {
      status: newStatus,
    });

    return { success: true, message: "Complaint status updated successfully" };
  } catch (error) {
    console.error("Error updating complaint status:", error);
    return { success: false, message: error.message };
  }
};
