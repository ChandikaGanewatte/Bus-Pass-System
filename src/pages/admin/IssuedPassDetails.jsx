import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Link,
  Divider,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MenuBarAdmin from "../../components/MenuBarAdmin";
import Footer from "../../components/Footer";
import { getApplicationDetails } from "../../services/firebasePassService";
import jsPDF from "jspdf";

const IssuedPassDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getApplicationDetails(id);
      setApplication(data);
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  const getValidImageUrl = (url) => {
    return url.includes("?") ? url + "&alt=media" : url + "?alt=media";
  };

  const downloadBusPass = async (application) => {
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
    doc.text("STATE TRANSPORT BUS PASS", 44, 8, { align: "center" });

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

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6">Loading application details...</Typography>
      </Box>
    );

  if (!application)
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">Application not found</Typography>
      </Box>
    );

  return (
    <Box>
      <MenuBarAdmin />
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1000, mx: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Application Details
        </Typography>

        {/* General Info */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box
              display={"flex"}
              flexDirection={isMobile ? "column" : "row"}
              justifyContent={"space-between"}
            >
              <Box>
                <Typography variant="h6" gutterBottom>
                  General Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box display="flex" flexDirection="row">
                  <Typography variant="subtitle1" mr={5}>
                    Pass Type:
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {(() => {
                      switch (application.userType) {
                        case "adult":
                          return "Adult";
                        case "student":
                          return "Student";
                        case "uni_student":
                          return "University Student";
                        default:
                          return "Unknown";
                      }
                    })()}
                  </Typography>
                </Box>
                <Box display={"flex"} flexDirection={"row"}>
                  <Typography variant="subtitle1" mr={8}>
                    Status:{" "}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      bgcolor: "green",
                      color: "white",
                      borderRadius: 2,
                      px: 2,
                    }}
                  >
                    {application.status}
                  </Typography>
                </Box>

                <Box display={"flex"} flexDirection={"row"}>
                  <Typography variant="subtitle1" mr={4}>
                    Applied At:{" "}
                  </Typography>
                  <Typography variant="subtitle1">
                    📅
                    {application.appliedAt?.toDate
                      ? application.appliedAt.toDate().toLocaleString()
                      : "Unknown"}
                  </Typography>
                </Box>
                <Box display={"flex"} flexDirection={"row"}>
                  <Typography variant="subtitle1" mr={2}>
                    Approved At:{" "}
                  </Typography>
                  <Typography variant="subtitle1">
                    📅
                    {application.appliedAt?.toDate
                      ? application.approvedAt.toDate().toLocaleString()
                      : "Unknown"}
                  </Typography>
                </Box>
              </Box>

              {/* Right – QR Code */}
              {application.qrCodeURL && (
                <Box
                  sx={{
                    p: 2,
                    border: "1px solid #e5e7eb",
                    borderRadius: 2,
                    backgroundColor: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                    QR Code
                  </Typography>
                  <img
                    src={application.qrCodeURL}
                    alt="QR Code"
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: 8,
                      objectFit: "cover",
                      border: "1px solid #ccc",
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => downloadBusPass(application)}
                  >
                    Download Pass
                  </Button>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Form Fields */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box
              sx={{
                backgroundColor: "#fcfcfcff", // slightly off-white
                p: 3,
                borderRadius: 2,
                border: "1px solid #d1d5db",
                mb: 3,
              }}
            >
              {Object.entries(application.formData)
                .filter(
                  ([key, value]) =>
                    value &&
                    !key.toLowerCase().includes("photo") &&
                    !key.toLowerCase().includes("slip")
                )
                .map(([key, value]) => {
                  // Map key to friendly label
                  let label = (() => {
                    switch (key) {
                      case "regNo":
                        return "Registration No";
                      case "grade":
                        return "Grade";
                      case "school":
                        return "School";
                      case "depot":
                        return "Depot";
                      case "route":
                        return "Route";
                      case "days":
                        return "Days";
                      case "birthday":
                        return "Birthday";
                      default:
                        // Capitalize and add space for other keys
                        return key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase());
                    }
                  })();

                  // Format date/time if value is timestamp
                  let displayValue = value;
                  if (value?.seconds) {
                    displayValue = new Date(
                      value.seconds * 1000
                    ).toLocaleDateString();
                  }

                  return (
                    <Box
                      key={key}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <TextField
                        label={label}
                        defaultValue={displayValue.toString()}
                        disabled
                        size="small"
                        fullWidth
                        sx={{ mb: 1, bgcolor: "white" }}
                      />
                    </Box>
                  );
                })}
            </Box>

            {/* Images Section */}
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Uploaded Documents
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {Object.entries(application.formData)
                  .filter(
                    ([key, value]) =>
                      value &&
                      (key.toLowerCase().includes("photo") ||
                        key.toLowerCase().includes("slip"))
                  )
                  .map(([key, value]) => (
                    <Box key={key} sx={{ textAlign: "center" }}>
                      <Typography variant="subtitle2" gutterBottom>
                        {(() => {
                          switch (key) {
                            case "photoURL":
                              return "Photo";
                            case "paymentSlipURL":
                              return "Payment Slip";
                            default:
                              // Convert camelCase or other keys to normal words
                              return key
                                .replace(/([A-Z])/g, " $1") // add space before capital letters
                                .replace(/^./, (str) => str.toUpperCase()); // capitalize first letter
                          }
                        })()}
                      </Typography>
                      <Link href={value} target="_blank" rel="noopener">
                        <img
                          src={value}
                          alt={key}
                          style={{
                            width: 150,
                            height: 150,
                            objectFit: "cover",
                            borderRadius: 8,
                            border: "1px solid #ccc",
                            padding: 4,
                            cursor: "pointer",
                          }}
                        />
                      </Link>
                    </Box>
                  ))}
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: { xs: "center", sm: "flex-start" },
            mt: 2,
          }}
        >
          <Button variant="contained" color="success" sx={{ minWidth: 120 }}>
            Hold
          </Button>
          <Button variant="contained" color="error" sx={{ minWidth: 120 }}>
            Cancel
          </Button>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default IssuedPassDetails;
