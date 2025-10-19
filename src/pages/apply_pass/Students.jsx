import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

import { db, storage } from "../../firebase/config"; // ✅ make sure paths match your setup
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";
import { useNotification } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";

const Students = () => {
    const { currentUser } = useAuth();
    const { showNotification } = useNotification();
    const navigate = useNavigate();

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

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.photo || !formData.paymentSlip) {
            showNotification("Please upload both student photo and payment slip.", "error");
            return;
        }

        try {
            if (!currentUser) {
                showNotification("You must be logged in to apply.", "error");
                return;
            }

            // Upload photo
            const photoRef = ref(storage, `applications/${currentUser.uid}/photo_${Date.now()}`);
            await uploadBytes(photoRef, formData.photo);
            const photoURL = await getDownloadURL(photoRef);

            // Upload payment slip
            const slipRef = ref(storage, `applications/${currentUser.uid}/slip_${Date.now()}`);
            await uploadBytes(slipRef, formData.paymentSlip);
            const slipURL = await getDownloadURL(slipRef);

            // Create application doc
            await addDoc(collection(db, "applications"), {
                userId: currentUser.uid,
                userType: "student",
                status: "pending",
                appliedAt: serverTimestamp(),
                formData: {
                    name: formData.name,
                    school: formData.school,
                    regNo: formData.regNo,
                    grade: formData.grade,
                    birthday: formData.birthday,
                    depot: formData.depot,
                    route: formData.route,
                    days: formData.days,
                    photoURL,
                    paymentSlipURL: slipURL,
                },
            });

            showNotification("Application submitted successfully!", "success");
            // setFormData({
            //     name: "",
            //     school: "",
            //     regNo: "",
            //     grade: "",
            //     birthday: null,
            //     depot: "",
            //     route: "",
            //     days: "",
            //     photo: null,
            //     paymentSlip: null,
            // });
            navigate('/')
        } catch (error) {
            console.error("Error submitting application:", error);
            showNotification("Failed to submit application.", "error");
        }

        setLoading(false);
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
                            sx={{ borderRadius: 2 }}
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

                        {formData.photo ? (
                            <Typography variant="body2" mt={1} color="text.secondary" mb={2}>
                                ✅ {formData.photo.name}
                            </Typography>
                        ) : (
                            <Typography variant="body2" mt={1} color="error" mb={2}>
                                * Student photo is required
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

                        {formData.paymentSlip ? (
                            <Typography variant="body2" mt={1} color="text.secondary" mb={2}>
                                ✅ {formData.paymentSlip.name}
                            </Typography>
                        ) : (
                            <Typography variant="body2" mt={1} color="error" mb={2}>
                                * Payment slip is required
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2, py: 1.3, borderRadius: 2 }}
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit Application"}
                        </Button>

                    </form>
                </Paper>
            </Box>
            <Footer />
        </div>
    );
};

export default Students;
