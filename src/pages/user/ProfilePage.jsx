import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Divider,
  Grid,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MenuBar from "../../components/MenuBar";

import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { auth, db } from "../../firebase/config";
import { deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { useNotification } from "../../context/NotificationContext";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDeleteAccount = async () => {
    // if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
    //   return;
    // }
    setLoading(true);

    try {
      const user = auth.currentUser;

      if (!user) {
        showNotification("No user is currently logged in.", "error")
        return;
      }

      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
      showNotification("Account Deleted !", "success");
      window.location.href = "/login";

    } catch (error) {
      console.error("Error deleting account:", error);
      if (error.code === "auth/requires-recent-login") {
        showNotification("Please log in again before deleting your account.", "Info");
      } else {
        showNotification("Failed to delete account.", "Info");
      }
    }
    setLoading(false);
    setOpenConfirm(false);
  };

  if (!currentUser) return <Typography>Loading user...</Typography>;

  return (
    <div>
      <MenuBar />

      <Box
        sx={{
          minHeight: "80vh",
          bgcolor: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 5,
          px: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            maxWidth: 700,
            width: "100%",
            borderRadius: 3,
            p: 4,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              mb: 3,
            }}
          >
            <Avatar
              alt={currentUser.name}
              src={currentUser.avatar}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Typography variant="h5" fontWeight={700}>
              {currentUser.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentUser.userType}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Info Section */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {currentUser.email}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Phone
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {currentUser.phone}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Address
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {currentUser.address}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button variant="contained" color="primary">
              Edit Profile
            </Button>
            <Button disabled={loading} variant="outlined" color="error" onClick={() => setOpenConfirm(true)} >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                "Delete Account"
              )}
            </Button>
          </Box>
        </Paper>
      </Box>

      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAccount}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>


      <Footer />
    </div>
  );
};

export default ProfilePage;
