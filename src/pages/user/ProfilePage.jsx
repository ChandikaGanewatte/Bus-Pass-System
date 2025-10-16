import React from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {

   const { currentUser } = useAuth();

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
            <Button variant="outlined" color="error">
              Delete Account
            </Button>
          </Box>
        </Paper>
      </Box>

      <Footer />
    </div>
  );
};

export default ProfilePage;
