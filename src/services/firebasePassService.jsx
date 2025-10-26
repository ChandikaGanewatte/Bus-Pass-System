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

// get all pass applicatons - admin ----------------------------------------
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

    // Extract year and month from formData.passPeriod ("YYYY-M")
    const [year, month] = application.formData.passPeriod
      ? application.formData.passPeriod.split("-").map(Number)
      : [new Date().getFullYear(), new Date().getMonth() + 1];

    // Get last day of the month
    const expiryDateObj = new Date(year, month, 0); // day=0 gives last day of previous month, so month is next month index
    const expiryDate = Timestamp.fromDate(expiryDateObj);

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

// get all pass applicatons - admin -----------------------------------------
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

