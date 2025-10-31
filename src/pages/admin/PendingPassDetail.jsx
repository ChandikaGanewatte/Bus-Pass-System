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
  CircularProgress,
} from "@mui/material";

import MenuBarAdmin from "../../components/MenuBarAdmin";
import Footer from "../../components/Footer";
import { useNotification } from "../../context/NotificationContext";
import {
  getApplicationDetails,
  approvePassApplicationWithQR,
} from "../../services/firebasePassService";
import { sendNotification } from "../../services/firebaseCommonService";
import { updatePassApplicationStatus } from "../../services/firebasePassService";

const PendingPassDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getApplicationDetails(id);
      setApplication(data);
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

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

  const handleApprove = async () => {
    setSubmitting(true);
    const qrURL = await approvePassApplicationWithQR(application);
    if (qrURL) {
      await sendNotification(
        application.userId,
        "Pass Approved 🎉",
        "Your bus pass has been approved. You can now download it from your dashboard.",
        "success"
      );

      showNotification(
        "Application Approved and QR Code Generated!",
        "success"
      );
      setApplication((prev) => ({
        ...prev,
        status: "approved",
        qrCodeURL: qrURL,
      }));
    } else {
      showNotification("Failed to approve application.", "error");
    }
    setSubmitting(false);
  };

  const handleReject = async () => {
    setSubmitting(true);
    try {
      // Update status in Firestore
      await updatePassApplicationStatus(application.id, "rejected");

      // Send notification to the user
      await sendNotification(
        application.userId,
        "Pass Rejected ❌",
        "Your bus pass application has been rejected. Please contact support for more information.",
        "error"
      );

      // Show temporary UI notification
      showNotification("Application has been rejected.", "error");

      // Update local state
      setApplication((prev) => ({
        ...prev,
        status: "rejected",
      }));
    } catch (err) {
      console.error("Failed to reject application:", err);
      showNotification("Failed to reject application.", "error");
    }
    setSubmitting(false);
  };

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
            <Typography variant="h6" gutterBottom>
              General Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" flexDirection="row">
              <Typography variant="subtitle1" mr={3}>
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
              <Typography variant="subtitle1" mr={6}>
                Status:{" "}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  bgcolor:
                    application.status === "approved" ? "green" : "orange",
                  color: "white",
                  borderRadius: 2,
                  px: 2,
                  textTransform: "capitalize", // optional → formats text like "Approved"
                }}
              >
                {application.status}
              </Typography>
            </Box>

            <Box display={"flex"} flexDirection={"row"}>
              <Typography variant="subtitle1" mr={2}>
                Applied At:{" "}
              </Typography>
              <Typography variant="subtitle1">
                📅
                {application.appliedAt?.toDate
                  ? application.appliedAt.toDate().toLocaleString()
                  : "Unknown"}
              </Typography>
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
          <Button
            variant="contained"
            color="success"
            sx={{
              minWidth: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleApprove}
            disabled={submitting} // prevents double click
          >
            {submitting ? (
              <CircularProgress size={24} /> // spinner
            ) : (
              "Approve"
            )}
          </Button>

          <Button
            variant="contained"
            color="error"
            sx={{ minWidth: 120 }}
            onClick={handleReject}
          >
            Reject
          </Button>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default PendingPassDetails;
