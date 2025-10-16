import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import MenuBar from "../components/MenuBar";
import Footer from "../components/Footer";

const TermsAndConditions = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <MenuBar />

      <Box sx={{ flex: 1, p: { xs: 2, md: 6 }, bgcolor: "#f9f9f9" }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            maxWidth: 900,
            mx: "auto",
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" fontWeight={700} gutterBottom textAlign="center">
            Terms and Conditions
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            Welcome to the Sri Lanka Transport Board Online Bus Pass System. By
            using this website, you agree to comply with and be bound by the
            following terms and conditions. Please read them carefully.
          </Typography>

          <Typography variant="h6" fontWeight={600} sx={{ mt: 3, mb: 1 }}>
            1. User Registration
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            Users must register with accurate personal information. Each user is
            responsible for maintaining the confidentiality of their account
            credentials.
          </Typography>

          <Typography variant="h6" fontWeight={600} sx={{ mt: 3, mb: 1 }}>
            2. Usage of the Service
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            This system provides online bus passes for students, university
            students, and adults. Users must not misuse the service or attempt
            unauthorized access.
          </Typography>

          <Typography variant="h6" fontWeight={600} sx={{ mt: 3, mb: 1 }}>
            3. Payment
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            All payments for bus passes must be completed through the provided
            payment methods. Users are responsible for verifying the accuracy
            of payment details before submission.
          </Typography>

          <Typography variant="h6" fontWeight={600} sx={{ mt: 3, mb: 1 }}>
            4. Privacy
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            User data is stored securely and will not be shared with third
            parties without consent, except as required by law.
          </Typography>

          <Typography variant="h6" fontWeight={600} sx={{ mt: 3, mb: 1 }}>
            5. Liability
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            The Sri Lanka Transport Board is not liable for any losses, delays,
            or damages arising from the use of this online service.
          </Typography>

          <Typography variant="body1" sx={{ mt: 3, lineHeight: 1.8 }}>
            By using this website, you acknowledge that you have read, understood,
            and agree to these terms and conditions.
          </Typography>
        </Paper>
      </Box>

      <Footer />
    </Box>
  );
};

export default TermsAndConditions;
