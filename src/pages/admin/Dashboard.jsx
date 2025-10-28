import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import SchoolIcon from "@mui/icons-material/School";
import BadgeIcon from "@mui/icons-material/Badge";
import FeedbackIcon from "@mui/icons-material/Feedback";
import MenuBarAdmin from "../../components/MenuBarAdmin";
import Footer from "../../components/Footer";
import { getStudentApprovedApplications, getUniStudentApprovedApplications } from "../../services/firebasePassService";
import {
  getComplaints,
  updateComplaintStatus,
} from "../../services/firebaseCommonService";
import { useNotification } from "../../context/NotificationContext";

const Dashboard = () => {
  const [pendingStudentPasses, setPendingStudentPasses] = useState(0);
  const [pendingUniStudentPasses, setPendingUniStudentPasses] = useState(0);
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  const {showNotification} = useNotification();

  useEffect(() => {
    const fetchPasses = async () => {
      const pendingStdntApps = await getStudentApprovedApplications();
      const pendingUniStdntApps = await getUniStudentApprovedApplications();
      setPendingStudentPasses(pendingStdntApps.length);
      setPendingUniStudentPasses(pendingUniStdntApps.length);
      setLoading(false);
    };
    fetchPasses();

    const fetchComplaints = async () => {
      setLoading(true);
      const result = await getComplaints();
      if (result.success) {
        setComplaints(result.data);
      } else {
        console.error("Failed to fetch complaints:", result.message);
      }
      setLoading(false);
    };

    fetchComplaints();
  }, []);

  const handleOpenDialog = (complaint) => {
    setSelectedComplaint(complaint);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedComplaint(null);
    setOpenDialog(false);
  };

  const handleMarkComplete = async () => {
    if (!selectedComplaint) return;

    const res = await updateComplaintStatus(selectedComplaint.id, "Completed");
    if (res.success) {
      // update UI
      setComplaints((prev) =>
        prev.map((c) =>
          c.id === selectedComplaint.id ? { ...c, status: "Completed" } : c
        )
      );
      showNotification("Make as complete", "success")
      handleCloseDialog();
    }
  };

  const stats = [
    {
      title: "Student Passes",
      count: pendingStudentPasses,
      icon: <SchoolIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
      title: "University Passes",
      count: pendingUniStudentPasses,
      icon: <BadgeIcon sx={{ fontSize: 40, color: "#2e7d32" }} />,
    },
    {
      title: "Adult Passes",
      count: 698,
      icon: <DirectionsBusIcon sx={{ fontSize: 40, color: "#d32f2f" }} />,
    },
  ];

  return (
    <div>
      <MenuBarAdmin />
      {loading ? (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2, // spacing between spinner & text
          }}
        >
          <CircularProgress />
          <Typography>Loading...</Typography>
        </Box>
      ) : (
        <Box sx={{ p: 3, bgcolor: "#f9f9f9", minHeight: "100vh" }}>
          {/* Dashboard Title */}
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Overview of issued passes and recent complaints
          </Typography>

          {/* --- Top Cards --- */}
          <Grid container spacing={3} mb={4}>
            {stats.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={4}
                  sx={{
                    borderRadius: 3,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      {item.title}
                    </Typography>
                    <Typography variant="h5" fontWeight={700}>
                      {item.count}
                    </Typography>
                  </Box>
                  {item.icon}
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* --- Complaints Section --- */}
          <Paper elevation={4} sx={{ borderRadius: 3, p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <FeedbackIcon sx={{ color: "#1976d2", mr: 1 }} />
              <Typography variant="h6" fontWeight={600}>
                Recent Complaints
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {complaints.length === 0 ? (
              <Typography color="text.secondary">
                No complaints to display.
              </Typography>
            ) : (
              <Box sx={{ maxHeight: 400, overflowY: "auto" }}> 
              <List>
                {complaints.map((complaint) => (
                  <ListItem
                    key={complaint.id}
                    sx={{
                      borderBottom: "1px solid #eee",
                      py: 1.5,
                      cursor: "pointer",
                    }}
                    onClick={() => handleOpenDialog(complaint)}
                  >
                    <ListItemText
                      primary={
                        <Typography fontWeight={600}>
                          {complaint.depot} Depot —{" "}
                          <Typography
                            component="span"
                            fontWeight={400}
                            color="error"
                          >
                            {complaint.reason}
                          </Typography>
                        </Typography>
                      }
                      secondary={
                        <div>
                          <Typography variant="body2" color="text.secondary">
                            {complaint.message || "No additional message."}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                          >
                            {complaint.createdAt?.toDate
                              ? new Date(
                                  complaint.createdAt.toDate()
                                ).toLocaleString()
                              : ""}
                          </Typography>
                          <Typography
                            variant="caption"
                            color={
                              complaint.status === "Completed"
                                ? "success.main"
                                : "warning.main"
                            }
                            display="block"
                          >
                            Status: {complaint.status || "Pending"}
                          </Typography>
                        </div>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button variant="contained" color="primary">
                View All Complaints
              </Button>
            </Box>

            {/* Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>Complaint Details</DialogTitle>
              <DialogContent dividers>
                {selectedComplaint && (
                  <Box>
                    <Typography>
                      <strong>Depot:</strong> {selectedComplaint.depot}
                    </Typography>
                    <Typography>
                      <strong>Reason:</strong> {selectedComplaint.reason}
                    </Typography>
                    <Typography>
                      <strong>Message:</strong>{" "}
                      {selectedComplaint.message || "No additional message."}
                    </Typography>
                    <Typography>
                      <strong>Status:</strong> {selectedComplaint.status}
                    </Typography>
                    <Typography>
                      <strong>Date:</strong>{" "}
                      {selectedComplaint.createdAt?.toDate
                        ? new Date(
                            selectedComplaint.createdAt.toDate()
                          ).toLocaleString()
                        : ""}
                    </Typography>
                  </Box>
                )}
              </DialogContent>
              <DialogActions>
                {selectedComplaint?.status !== "Completed" && (
                  <Button
                    onClick={handleMarkComplete}
                    color="primary"
                    variant="contained"
                  >
                    Mark as Complete
                  </Button>
                )}
                <Button onClick={handleCloseDialog} variant="outlined">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>

          {/* --- Additional Section --- */}
          <Box mt={4}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ py: 1.5, borderRadius: 2 }}
                >
                  Manage Users
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  sx={{ py: 1.5, borderRadius: 2 }}
                >
                  View Pass Reports
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="success"
                  sx={{ py: 1.5, borderRadius: 2 }}
                >
                  Generate Monthly Summary
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}

      <Footer />
    </div>
  );
};

export default Dashboard;
