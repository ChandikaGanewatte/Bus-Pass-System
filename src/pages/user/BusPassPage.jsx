import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";

import { db } from "../../firebase/config"; // make sure this is your firebase config
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";
import jsPDF from "jspdf";

const BusPassPage = () => {
  const [pendingPasses, setPendingPasses] = useState([]);
  const [approvedPasses, setApprovedPasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPasses = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "applications"),
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(q);

      const pending = [];
      const approved = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.status === "pending") {
          pending.push({ id: doc.id, ...data });
        } else if (data.status === "approved") {
          approved.push({ id: doc.id, ...data });
        }
      });

      setPendingPasses(pending);
      setApprovedPasses(approved);
      setLoading(false);
    };

    fetchPasses();
  }, []);

    const getValidImageUrl = (url) => {
    return url.includes("?") ? url + "&alt=media" : url + "?alt=media";
  };

  const handleDownloadQR = async (pass) => {
    const application = pass




    const doc = new jsPDF("landscape", "mm", [86, 54]); // Standard bus pass card size
    
        const primaryColor = "#d90429"; // SLTB Red
        const textColor = "#000";
    
        const qrUrl = getValidImageUrl(application.qrCodeURL);
        const photoUrl = application.formData?.photoURL
          ? getValidImageUrl(application.formData.photoURL)
          : null;
    
        // Background Pass Shape
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(2, 2, 82, 50, 3, 3, "F");
    
        // Header Bar
        doc.setFillColor(primaryColor);
        doc.rect(2, 2, 82, 10, "F");
    
        // Title Text
        doc.setFontSize(9);
        doc.setTextColor("#fff");
        doc.setFont("helvetica", "bold");
        doc.text("SLTB - BUS PASS", 44, 8, { align: "center" });
    
        doc.setTextColor(textColor);
        doc.setFont("helvetica", "normal");
    
        // Add User Image (if exists)
        const loadPhoto = async () => {
          if (!photoUrl) return;
          try {
            const blob = await fetch(photoUrl).then((r) => r.blob());
            const reader = await new Promise((resolve) => {
              const fr = new FileReader();
              fr.onloadend = () => resolve(fr.result);
              fr.readAsDataURL(blob);
            });
            doc.addImage(reader, "JPEG", 5, 14, 18, 22);
          } catch (e) {
            console.warn("Photo missing");
          }
        };
    
        // Add QR Code
        const loadQR = async () => {
          try {
            const blob = await fetch(qrUrl).then((r) => r.blob());
            const reader = await new Promise((resolve) => {
              const fr = new FileReader();
              fr.onloadend = () => resolve(fr.result);
              fr.readAsDataURL(blob);
            });
            doc.addImage(reader, "PNG", 60, 12, 20, 20);
          } catch (err) {
            console.error("QR Error", err);
            doc.text("QR Missing", 60, 18);
          }
        };
    
        // Student Info
        doc.setFontSize(7);
        doc.text(`Name: ${application.formData?.name || "-"}`, 25, 18);
    
        doc.text(
          `Type: ${
            application.userType === "student"
              ? "Student"
              : application.userType === "uni_student"
              ? "University Student"
              : "Adult"
          }`,
          25,
          23
        );
    
        doc.text(`Route: ${application.formData?.route || "-"}`, 25, 28);
        doc.text(`Depot: ${application.formData?.depot || "-"}`, 25, 33);
    
        if (application.expiryDate?.toDate) {
          doc.setTextColor(primaryColor);
          doc.text(
            `Valid Until: ${application.expiryDate.toDate().toLocaleDateString()}`,
            25,
            38
          );
          doc.setTextColor(textColor);
        }
    
        // Footer
        doc.setFontSize(6);
        doc.text("Hotline: 1919 | www.ctb.lk", 44, 47, { align: "center" });
    
        // Render images THEN save
        await loadPhoto();
        await loadQR();
    
        doc.save(`${application.formData?.name}_BusPass.pdf`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
        <p>Loading your passes...</p>
      </div>
    );
  }

  return (
    <Box>
      <MenuBar />
      <Box className="buspass-container">
        <Typography variant="h4" className="buspass-title" mb={2}>
          My Bus Passes
        </Typography>

        {/* Pending Applications */}
        {pendingPasses.length > 0 && (
          <Box className="pending-section">
            <Card
              className="pending-card"
              sx={{ borderRadius: 3, boxShadow: 1 }}
            >
              <CardContent>
                <Typography variant="h6" className="pending-title">
                  <span className="pending-dot"></span>
                  Pending Applications
                </Typography>

                <Box className="pending-list">
                  {pendingPasses.map((pass) => (
                    <Typography
                      key={pass.id}
                      className="pending-item"
                      variant="body2"
                    >
                      📅 Submitted on{" "}
                      <span className="pending-date">
                        {pass.appliedAt?.toDate
                          ? pass.appliedAt.toDate().toLocaleDateString()
                          : "Unknown date"}
                      </span>{" "}
                      — Awaiting approval.
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Approved Passes */}
        <Box className="bus-pass-section">
          <Typography variant="h5" className="bus-pass-title" mb={2}>
            Approved Passes
          </Typography>

          {approvedPasses.length === 0 ? (
            <Typography className="no-pass-text">
              No approved passes yet.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {approvedPasses.map((pass) => (
                <Grid item xs={12} sm={6} md={4} key={pass.id}>
                  <Card
                    sx={{
                      background: "linear-gradient(135deg, #10b981, #047857)",
                      borderRadius: 3,
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      // minHeight: 220,
                      boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: 700, mb: 1 }}
                      >
                        {pass.formData?.name || "Unnamed Pass"}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        Route: {pass.formData?.route || "N/A"}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        Depot: {pass.formData?.depot || "N/A"}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontStyle: "italic", opacity: 0.9 }}
                      >
                        Expiry Date:{" "}
                        {pass.expiryDate
                          ? new Date(
                              pass.expiryDate.seconds * 1000
                            ).toLocaleDateString()
                          : "Not available"}
                      </Typography>
                    </CardContent>

                    {pass.qrCodeURL && (
                      <CardActions className="qr-section">
                        <img
                          src={pass.qrCodeURL}
                          alt="QR Code"
                          className="qr-image"
                        />
                        <Button
                          variant="contained"
                          size="small"
                          className="download-btn"
                          onClick={() => handleDownloadQR(pass)}
                        >
                          Download QR Code
                        </Button>
                      </CardActions>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default BusPassPage;
