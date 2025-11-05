const { onSchedule } = require("firebase-functions/v2/scheduler");
const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const logger = require("firebase-functions/logger");

initializeApp();

async function checkAndExpirePasses() {
  const db = getFirestore();
  const now = new Date();
  const applicationsRef = db.collection("applications");

  const snapshot = await applicationsRef.where("status", "==", "approved").get();
  const batch = db.batch();
  let expiredCount = 0;

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.expiryDate && data.expiryDate.toDate() < now) {
      const appRef = applicationsRef.doc(doc.id);
      batch.update(appRef, { status: "expired" });

      // Add notification for the user
      if (data.userId) {
        const notifRef = db.collection("notifications").doc();
        batch.set(notifRef, {
          userId: data.userId,
          message: "Your bus pass has expired.",
          type: "expiry",
          createdAt: new Date(),
          read: false,
        });
      }

      expiredCount++;
    }
  });

  if (expiredCount > 0) {
    await batch.commit();
    logger.info(`✅ ${expiredCount} passes expired and notifications sent.`);
  } else {
    logger.info("ℹ️ No passes expired today.");
  }

  return null;
}

// Runs automatically every 24 hours
exports.autoExpirePasses = onSchedule("every 24 hours", async (event) => {
  logger.info("⏰ Running daily expiry + notification check...");
  await checkAndExpirePasses();
});

// Run manually from browser (for testing)
exports.manualExpireCheck = onRequest(async (req, res) => {
  await checkAndExpirePasses();
  res.send("✅ Manual expiry + notification check complete");
});
