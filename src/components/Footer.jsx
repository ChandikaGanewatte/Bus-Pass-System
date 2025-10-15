import React from "react";
import { Box, Container, Typography, Link, Grid } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: "primary.main",
                color: "white",
                mt: "auto",
                py: 4,
            }}
        >
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={4}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    {/* Logo + Title */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <img
                                src="/logo.png"
                                alt="Logo"
                                style={{ width: 40, height: 40 }}
                            />
                            <Typography variant="h6" fontWeight={600}>
                                Bus Pass System
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                            A modern solution for managing bus passes efficiently.
                        </Typography>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Quick Links
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Link href="/" color="inherit" underline="hover">
                                Home
                            </Link>
                            <Link href="/about" color="inherit" underline="hover">
                                About
                            </Link>
                            <Link href="/contact" color="inherit" underline="hover">
                                Contact
                            </Link>
                        </Box>
                    </Grid>

                    {/* Contact Info */}
                    <Grid item xs={12} sm={12} md={4}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2">📍 Colombo, Sri Lanka</Typography>
                        <Typography variant="body2">📧 support@buspass.com</Typography>
                        <Typography variant="body2">📞 +94 71 123 4567</Typography>
                    </Grid>
                </Grid>

                {/* Bottom bar */}
                <Box
                    mt={4}
                    pt={2}
                    borderTop="1px solid rgba(255,255,255,0.2)"
                    textAlign="center"
                >
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        © {new Date().getFullYear()} Bus Pass System. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
