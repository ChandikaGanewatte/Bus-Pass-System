import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import MenuBar from "../../components/MenuBarAdmin";

import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { auth, db } from "../../firebase/config";
import { deleteUser, updateProfile } from "firebase/auth";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useNotification } from "../../context/NotificationContext";

const AdminProfile = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { showNotification } = useNotification();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    idno: currentUser?.idno || "",
    position: currentUser?.position || "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;

      if (!user) {
        showNotification("No user is currently logged in.", "error");
        return;
      }

      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
      showNotification("Account Deleted !", "success");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error deleting account:", error);
      if (error.code === "auth/requires-recent-login") {
        showNotification(
          "Please log in again before deleting your account.",
          "Info"
        );
      } else {
        showNotification("Failed to delete account.", "Info");
      }
    }
    setLoading(false);
    setOpenConfirm(false);
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      // Save changes
      setSaving(true);
      try {
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, {
          name: formData.name,
          idno: formData.idno,
          position: formData.position,
        });

        // Optionally update Firebase Auth profile name
        await updateProfile(auth.currentUser, {
          displayName: formData.name,
        });

        showNotification("Profile updated successfully!", "success");
        setIsEditing(false);
      } catch (error) {
        console.error(error);
        showNotification("Failed to update profile.", "error");
      }
      setSaving(false);
    } else {
      setIsEditing(true);
    }
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
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          </Box>
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
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              size="small"
            />
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="ID No"
              name="idno"
              value={formData.idno}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              size="small"
            />
            <TextField
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              multiline
              rows={2}
              size="small"
            />
            <TextField
              label="Email"
              value={currentUser.email}
              disabled
              fullWidth
              size="small"
            />
          </Box>

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
            <Button
              variant="contained"
              color={isEditing ? "success" : "primary"}
              onClick={handleEditToggle}
              startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
              disabled={saving}
            >
              {saving ? (
                <CircularProgress size={24} />
              ) : isEditing ? (
                "Save Changes"
              ) : (
                "Edit Profile"
              )}
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              disabled={loading}
              variant="outlined"
              color="error"
              onClick={() => setOpenConfirm(true)}
            >
              {loading ? <CircularProgress size={24} /> : "Delete Account"}
            </Button>
          </Box>
        </Paper>
      </Box>

      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">
          Confirm Account Deletion
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be
            undone.
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
            startIcon={<DeleteIcon />}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminProfile