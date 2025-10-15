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
                    <Typography
                        variant="h3"
                        fontWeight={700}

                        textAlign="center"
                        mb={4}
                    >
                        About Us
                    </Typography>

                    {/* Left Section: Description */}
                    <Paper
                        elevation={6}
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            bgcolor: "white",
                            mb: 5
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
                            that contribute to the economic, social, and cultural
                            development of Sri Lanka.
                        </Typography>
                    </Paper>


                    {/* Right Section: Vision & Values */}
                    <Paper
                        elevation={6}
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            bgcolor: "white",
                        }}
                    >
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            Our Vision
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            To be the most trusted and preferred public transport provider
                            in Sri Lanka, known for excellence and innovation.
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


                </Container>

            </Box>
            <Footer />
        </div>

    );
};

export default AboutUs;
