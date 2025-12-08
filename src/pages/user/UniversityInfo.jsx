import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";

import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

function UniversityInfo() {
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
            University Student Season pass
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
              The University Student Season Pass helps university students
              travel easily between their residence or boarding place and the
              university at a reduced monthly fare. To apply, fill out the form
              with your personal and university details, upload your university
              ID photo(should be clear) and payment slip, and submit your
              application online. After you submit, CTB staff will review and
              verify your information. Once approved, you’ll receive a
              notification, and you can then download your QR-based e-pass from
              your account to use conveniently on CTB buses.
            </Typography>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </div>
  );
}

export default UniversityInfo;
