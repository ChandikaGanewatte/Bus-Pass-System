import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    MenuItem,
    InputLabel,
    Select,
    FormControl,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

const Students = () => {
    const [formData, setFormData] = useState({
        name: "",
        school: "",
        regNo: "",
        grade: "",
        birthday: null,
        depot: "",
        route: "",
        days: "",
        photo: null,
        paymentSlip: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        alert("Application Submitted Successfully!");
    };

    return (
        <div>
            <MenuBar />
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#f5f5f5",
                    p: 3,
                }}
            >
                <Paper
                    elevation={6}
                    sx={{ maxWidth: 600, width: "100%", p: 4, borderRadius: 3 }}
                >
                    <Typography variant="h5" fontWeight={700} textAlign="center" mb={3}>
                        Student Season Pass Application
                    </Typography>

                    <form onSubmit={handleSubmit}>

                        <div className="double-inputs">
                            <TextField
                                fullWidth
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <TextField
                                fullWidth
                                label="School"
                                name="school"
                                value={formData.school}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="double-inputs">
                            <TextField
                                fullWidth
                                label="Registration Number"
                                name="regNo"
                                value={formData.regNo}
                                onChange={handleChange}
                                required
                            />

                            <TextField
                                select
                                fullWidth
                                label="Grade"
                                name="grade"
                                value={formData.grade}
                                onChange={handleChange}
                                required
                            >
                                {Array.from({ length: 8 }, (_, i) => i + 5).map((grade) => (
                                    <MenuItem key={grade} value={grade}>
                                        Grade {grade}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div className="double-inputs">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker

                                    label="Birthday"
                                    value={formData.birthday}
                                    onChange={(newValue) =>
                                        setFormData((prev) => ({ ...prev, birthday: newValue }))
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} fullWidth required />
                                    )}
                                />
                            </LocalizationProvider>

                            <TextField
                                fullWidth
                                label="Depot Name"
                                name="depot"
                                value={formData.depot}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="double-inputs">
                            <TextField
                                fullWidth
                                label="Route Name"
                                name="route"
                                value={formData.route}
                                onChange={handleChange}
                                required
                            />

                            <FormControl fullWidth required>
                                <InputLabel>Days</InputLabel>
                                <Select
                                    name="days"
                                    value={formData.days}
                                    onChange={handleChange}
                                    label="Days"
                                >
                                    <MenuItem value={20}>20 Days</MenuItem>
                                    <MenuItem value={30}>30 Days</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                            sx={{ borderRadius: 2, mb: 2 }}
                        >
                            Upload Student's Photo
                            <input
                                type="file"
                                hidden
                                name="photo"
                                accept="image/*"
                                onChange={handleChange}
                            />
                        </Button>
                        {formData.photo && (
                            <Typography variant="body2" mt={1}>
                                {formData.photo.name}
                            </Typography>
                        )}

                        <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                            sx={{ borderRadius: 2 }}
                        >
                            Upload Payment Slip
                            <input
                                type="file"
                                hidden
                                name="paymentSlip"
                                accept="image/*,.pdf"
                                onChange={handleChange}
                            />

                        </Button>
                        {formData.paymentSlip && (
                            <Typography variant="body2" mt={1}>
                                {formData.paymentSlip.name}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2, py: 1.3, borderRadius: 2 }}
                        >
                            Submit Application
                        </Button>

                    </form>
                </Paper>
            </Box>
            <Footer />
        </div>
    );
};

export default Students;
