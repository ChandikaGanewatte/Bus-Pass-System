import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    MenuItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import MenuBar from "../components/MenuBar";
import Footer from "../components/Footer";

const ComplainsPage = () => {
    const [formData, setFormData] = useState({
        date: null,
        depot: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert("Complain submitted successfully!");
        // Add backend integration here
    };

    const depots = [
        "Colombo Depot",
        "Kandy Depot",
        "Galle Depot",
        "Jaffna Depot",
        "Kurunegala Depot",
    ];

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
                    p: 2,
                }}
            >
                <Paper
                    elevation={6}
                    sx={{ maxWidth: 500, width: "100%", p: 4, borderRadius: 3 }}
                >
                    <Typography variant="h5" fontWeight={700} textAlign="center" mb={3}>
                        Submit a Complaint
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        {/* Date */}
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date"
                                value={formData.date}
                                onChange={(newValue) =>
                                    setFormData((prev) => ({ ...prev, date: newValue }))
                                }
                                renderInput={(params) => (
                                    <TextField {...params} fullWidth margin="normal" required />
                                )}
                            />
                        </LocalizationProvider>

                        {/* Depot Dropdown */}
                        <TextField
                            select
                            fullWidth
                            label="Depot"
                            name="depot"
                            value={formData.depot}
                            onChange={handleChange}
                            margin="normal"
                            required
                        >
                            {depots.map((depot) => (
                                <MenuItem key={depot} value={depot}>
                                    {depot}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Message Box */}
                        <TextField
                            fullWidth
                            label="Complaint Message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            margin="normal"
                            multiline
                            rows={4}
                            required
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2, py: 1.2, borderRadius: 2 }}
                        >
                            Submit Complaint
                        </Button>
                    </form>
                </Paper>
            </Box>
            <Footer />
        </div>
    );
};

export default ComplainsPage;
