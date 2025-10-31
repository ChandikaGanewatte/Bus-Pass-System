import { db, storage } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import QRCode from "qrcode";

// get all student pass applicatons - admin ----------------------------------------
export const getStudentPendingApplications = async () => {
  try {
    const q = query(
      collection(db, "applications"),
      where("status", "==", "pending"),
      where("userType", "==", "student")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting pending applications:", error);
    return [];
  }
};

// get all uni student pass applicatons - admin ----------------------------------------
export const getUniStudentPendingApplications = async () => {
  try {
    const q = query(
      collection(db, "applications"),
      where("status", "==", "pending"),
      where("userType", "==", "uni_student")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting pending applications:", error);
    return [];
  }
};

// get all uni student pass applicatons - admin ----------------------------------------
export const getAdultsPendingApplications = async () => {
  try {
    const q = query(
      collection(db, "applications"),
      where("status", "==", "pending"),
      where("userType", "==", "adult")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting pending applications:", error);
    return [];
  }
};


// get a pass application details - admin ---------------------------------
export const getApplicationDetails = async (docId) => {
  try {
    const docRef = doc(db, "applications", docId); // <-- collection name must match your DB
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching application details:", error);
    return null;
  }
};

// approve the pass application - admin -----------------------------------
export const approvePassApplicationWithQR = async (application) => {
  try {
    const docRef = doc(db, "applications", application.id);

    // Get applied month from application data
    const month = application.formData.passMonth; // 1-12
    const year = new Date().getFullYear(); // You can update later if year selection added

    // ✅ Calculate last day of selected month
    const lastDayOfMonth = new Date(year, month, 0); // month index auto handles end date
    const expiryDate = Timestamp.fromDate(lastDayOfMonth);

    // Prepare QR code data
    const qrData = JSON.stringify({
      userId: application.userId,
      expiry: expiryDate.toDate().toISOString(),
      depot: application.formData.depot,
      route: application.formData.route,
    });

    const qrCodeDataUrl = await QRCode.toDataURL(qrData);

    // Save QR code to Firebase Storage
    const qrRef = ref(
      storage,
      `applications/${application.userId}/qr_${Date.now()}.png`
    );
    await uploadString(qrRef, qrCodeDataUrl, "data_url");
    const qrCodeURL = await getDownloadURL(qrRef);

    // Update the application document
    await updateDoc(docRef, {
      status: "approved",
      approvedAt: serverTimestamp(),
      qrCodeURL,
      expiryDate,
    });

    return qrCodeURL; // return the QR code URL if needed
  } catch (error) {
    console.error("Error approving application:", error);
    return null;
  }
};

// get all approved student pass applicatons - admin --------------------------------
export const getStudentApprovedApplications = async () => {
  try {
    const q = query(
      collection(db, "applications"),
      where("status", "==", "approved"),
      where("userType", "==", "student")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting approved applications:", error);
    return [];
  }
};

// get all approved uni student pass applicatons - admin --------------------------------
export const getUniStudentApprovedApplications = async () => {
  try {
    const q = query(
      collection(db, "applications"),
      where("status", "==", "approved"),
      where("userType", "==", "uni_student")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting approved applications:", error);
    return [];
  }
};

// get all approved uni student pass applicatons - admin --------------------------------
export const getAdultApprovedApplications = async () => {
  try {
    const q = query(
      collection(db, "applications"),
      where("status", "==", "approved"),
      where("userType", "==", "adult")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting approved applications:", error);
    return [];
  }
};