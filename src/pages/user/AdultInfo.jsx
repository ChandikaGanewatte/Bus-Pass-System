import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";

import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

function AdultInfo() {
  return (
    <div>
      <MenuBar />
      <Box
        sx={{
          minHeight: "80vh",
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          py: 6,
        }}
      >
        <Container>
          {/* Heading */}
          <Typography variant="h3" fontWeight={700} textAlign="center" mb={4}>
            Adult Season pass
          </Typography>

          {/* Left Section: Description */}
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: "white",
              mb: 5,
            }}
          >
            <Typography variant="body1" color="text.secondary" paragraph>
              The Adults Season Pass allows regular commuters to travel between
              their home and workplace conveniently at a discounted monthly
              fare. To apply, simply complete the online form with your
              personal, workplace, and route details, upload a copy of your NIC
              and payment slip, and submit your application. After submission,
              the CTB staff will verify your information and notify you by email
              or SMS once your pass is approved. You can then download your
              digital QR e-pass directly from your account for use on any CTB
              bus.
            </Typography>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </div>
  );
}

export default AdultInfo;