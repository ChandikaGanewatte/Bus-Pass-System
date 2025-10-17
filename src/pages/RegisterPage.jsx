import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Link,
    Paper,
    MenuItem,
    CircularProgress
} from "@mui/material";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useNotification } from "../context/NotificationContext";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "user", // Added userType
        termsChecked: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        if (!formData.termsChecked) {
            // alert("You must agree to the terms and conditions!");
            showNotification("You must agree to the terms and conditions!", "info");
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            // alert("Passwords do not match!");
            showNotification("Passwords do not match!", "info");
             setLoading(false);
            return;
        }

        if (!formData.userType) {
            // alert("Please select a user type!");
             setLoading(false);
            return;
        }

        try {
            // Create Firebase auth user
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            // Save user data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: formData.username,
                email: formData.email,
                userType: formData.userType,
                createdAt: new Date(),
            });

            showNotification("Registration successful!", "success");
            navigate("/login");
        } catch (error) {
            console.error("Error registering user:", error.message);
            showNotification(error.message, "error");
        }
        setLoading(false);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                flexDirection: 'column',
                alignItems: "center",
                bgcolor: 'primary.main',
                p: 2,
            }}
        >

            <img src="/logo.png" alt="Logo" style={{ width: 100, height: 100 }} />
            <Typography mb={2} variant="h4" fontWeight={700} color="white">
                Sri Lanka Transport Board
            </Typography>


            <Paper elevation={6} sx={{ maxWidth: 400, width: "100%", p: 4, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight={700} textAlign="center" mb={3}>
                    Registration
                </Typography>

                <form onSubmit={handleSubmit}>

                    <TextField
                        fullWidth
                        label="Name"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        margin="normal"
                        required
                        size="small"
                    />
                    <TextField
                        fullWidth
                        label="Email"
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
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        required
                        size="small"
                    />
                    <TextField
                        fullWidth
                        label="Re-enter Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        margin="normal"
                        required
                        size="small"
                    />

                    {/* <TextField
                        select
                        label="User Type"
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        size="small"
                    >
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="uni_student">University Student</MenuItem>
                        <MenuItem value="adult">Adult</MenuItem>
                    </TextField> */}

                    <FormControlLabel
                        control={
                            <Checkbox
                                name="termsChecked"
                                checked={formData.termsChecked}
                                onChange={handleChange}

                            />
                        }
                        label={
                            <Typography variant="body2">
                                I agree to the{" "}
                                <Link href="/terms" underline="hover">
                                    Terms and Conditions
                                </Link>
                            </Typography>
                        }
                        sx={{ mt: 1 }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Register"
                        )}
                    </Button>

                    <Typography variant="body2" textAlign="center" mt={2}>
                        Already have an account?{" "}
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate("/login")}
                        >
                            Register
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

export default RegisterPage;
