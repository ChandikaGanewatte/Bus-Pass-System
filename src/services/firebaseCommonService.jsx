import {
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  getDocs,
  query,
  doc,
  updateDoc,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";

// submit complains -----------------------------------------
export const submitComplaint = async ({ userId, depot,bus_No, reason, message }) => {
  try {
    const complaintsRef = collection(db, "complaints");

    await addDoc(complaintsRef, {
      userId,
      depot,
      bus_No,
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

// get routes --------------------------------------------
export const getBusRoutes = async () => {
  try {
    const busRoutesRef = collection(db, "routes");
    const q = query(busRoutesRef, orderBy("routeNo", "asc")); // or desc

    const querySnapshot = await getDocs(q);
    const routes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { success: true, data: routes };
  } catch (error) {
    console.error("Error fetching routes:", error);
    return { success: false, message: error.message };
  }
};

// upload route bulk -------------------------------------------
export const uploadRoutesBulk = async (routes) => {
  try {
    const routesRef = collection(db, "routes");

    const uploads = routes.map((route) => addDoc(routesRef, route));
    await Promise.all(uploads);

    return { success: true };
  } catch (error) {
    console.error("Bulk upload failed:", error);
    return { success: false, message: error.message };
  }
};

// Add notification ---------------------------------------------------------
export const sendNotification = async (userId, title, message, type = "info") => {
  try {
    await addDoc(collection(db, "notifications"), {
      userId,
      title,
      message,
      type,
      isRead: false,
      createdAt: serverTimestamp(),
    });
    console.log("Notification sent to user:", userId);
    return { success: true };
  } catch (error) {
    console.error("Error sending notification:", error);
    return { success: false, message: error.message };
  }
};

// Listen for user's notifications --------------------------------------------
export const listenToUserNotifications = (userId, callback) => {
  const q = query(
    collection(db, "notifications"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const notifications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(notifications);
  });
};
