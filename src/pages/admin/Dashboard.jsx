import React from "react";
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
} from "@mui/material";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import SchoolIcon from "@mui/icons-material/School";
import BadgeIcon from "@mui/icons-material/Badge";
import FeedbackIcon from "@mui/icons-material/Feedback";
import MenuBarAdmin from "../../components/MenuBarAdmin";
import Footer from "../../components/Footer";

const Dashboard = () => {

  const stats = [
    {
      title: "Student Passes",
      count: 452,
      icon: <SchoolIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
      title: "University Passes",
      count: 312,
      icon: <BadgeIcon sx={{ fontSize: 40, color: "#2e7d32" }} />,
    },
    {
      title: "Adult Passes",
      count: 698,
      icon: <DirectionsBusIcon sx={{ fontSize: 40, color: "#d32f2f" }} />,
    },
  ];

  
  const complaints = [
    { id: 1, depot: "Colombo", date: "2025-10-15", message: "Late bus arrival" },
    { id: 2, depot: "Kandy", date: "2025-10-14", message: "Overcrowded route" },
    { id: 3, depot: "Galle", date: "2025-10-12", message: "Driver behavior complaint" },
  ];

  return (
    <div>
      <MenuBarAdmin />

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
            <Typography color="text.secondary">No complaints to display.</Typography>
          ) : (
            <List>
              {complaints.map((complaint) => (
                <ListItem
                  key={complaint.id}
                  sx={{
                    borderBottom: "1px solid #eee",
                    py: 1.5,
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography fontWeight={600}>
                        {complaint.depot} Depot
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {complaint.date} — {complaint.message}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" color="primary">
              View All Complaints
            </Button>
          </Box>
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

      <Footer />
    </div>
  );
};

export default Dashboard;
