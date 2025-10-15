import React, { useState } from "react";
import {
    Box,
    Typography,
    Container,
    Grid,
    TextField,
    Button,
    Paper,
} from "@mui/material";

import MenuBar from "../components/MenuBar";
import Footer from "../components/Footer";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div>
            <MenuBar />
            <Box
                sx={{
                    minHeight: "100vh",
                    bgcolor: "background.default",
                    py: 6,
                    display: "flex",
                    alignItems: "center",
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
                        Contact Us
                    </Typography>


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
                            Get in Touch
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            Have questions or feedback? Fill out the form below and we’ll
                            get back to you soon.
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Your Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                margin="normal"
                                required
                                size="small"
                            />
                            <TextField
                                fullWidth
                                label="Your Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                margin="normal"
                                required
                                size="small"
                            />
                            <TextField
                                fullWidth
                                label="Message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                margin="normal"
                                required
                                multiline
                                rows={4}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
                            >
                                Send Message
                            </Button>
                        </form>
                    </Paper>



                    <Paper
                        elevation={6}
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            bgcolor: "white",
                            height: "100%",
                        }}
                    >
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            Contact Information
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            📍 Address: Sri Lanka Transport Board Headquarters, Colombo
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            📞 Phone: +94 11 123 4567
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            ✉️ Email: info@sltb.lk
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            🕒 Working Hours: Mon - Fri, 8:30 AM - 5:00 PM
                        </Typography>
                    </Paper>

                </Container>
            </Box>

            <Footer />
        </div>
    );
};

export default ContactUs;
