import React from "react";
import { Box, Typography, Container, Grid, Paper } from "@mui/material";

import MenuBar from "../components/MenuBar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div>
      <MenuBar />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          py: 6,
        }}
      >
        <Container>
          {/* Heading */}
          <Typography variant="h3" fontWeight={700} textAlign="center" mb={4}>
            About Us
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
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Who We Are
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Sri Lanka Transport Board (SLTB) is the leading public transport
              service provider in the country, serving millions of passengers
              every day. With a commitment to safety, reliability, and
              affordability, we continue to connect communities and empower
              people’s mobility.
            </Typography>

            <Typography variant="h5" fontWeight={700} gutterBottom mt={3}>
              Our Mission
            </Typography>
            <Typography variant="body1" color="text.secondary">
              To provide sustainable, safe, and efficient transport solutions
              that contribute to the economic, social, and cultural development
              of Sri Lanka.
            </Typography>
          </Paper>

          {/* Right Section: Vision & Values */}
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: "white",
              mb: 5,
            }}
          >
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Our Vision
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              To be the most trusted and preferred public transport provider in
              Sri Lanka, known for excellence and innovation.
            </Typography>

            <Typography variant="h5" fontWeight={700} gutterBottom mt={3}>
              Core Values
            </Typography>
            <ul style={{ marginTop: "8px" }}>
              <li>
                <Typography variant="body1" color="text.secondary">
                  Customer Focus – Putting passengers first
                </Typography>
              </li>
              <li>
                <Typography variant="body1" color="text.secondary">
                  Safety – Ensuring secure journeys
                </Typography>
              </li>
              <li>
                <Typography variant="body1" color="text.secondary">
                  Reliability – On-time, every time
                </Typography>
              </li>
              <li>
                <Typography variant="body1" color="text.secondary">
                  Sustainability – Caring for the environment
                </Typography>
              </li>
            </ul>
          </Paper>

          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: "white",
            }}
          >
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Payment Details
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              To complete your bus pass application, please make the payment to
              the official account of the Sri Lanka Transport Board (SLTB).
              Ensure that you enter your NIC number or Student ID as the payment
              reference to avoid verification delays.
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              <strong>Account Name:</strong> CTB Season Pass Service <br />
              <strong>Bank Name:</strong> People’s Bank <br />
              <strong>Branch:</strong> Colombo Main Branch <br />
              <strong>Account Number:</strong> 123456789012
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              After completing the payment, please upload your payment slip as
              proof. Your bus pass request will be processed once the payment is
              successfully verified by our system.
            </Typography>

            <Typography variant="h5" fontWeight={700} gutterBottom mt={3}>
              Important Notes
            </Typography>

            <Typography variant="body1" color="text.secondary">
              • Always double-check the account details before making the
              payment. <br />• Use your NIC number or Student ID as the payment
              reference. <br />• Keep a copy of your payment slip for future
              verification.
            </Typography>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </div>
  );
};

export default AboutUs;
