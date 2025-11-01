import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Link, Paper, CircularProgress } from "@mui/material";

import { signInWithEmailAndPassword, } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useNotification } from "../context/NotificationContext";

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
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

        try {
            // Firebase login
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = userCredential.user;

            // Fetch user data from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log("User data:", userData);

                // Save user info to localStorage (if remember me is checked)
                if (formData.rememberMe) {
                    localStorage.setItem("user", JSON.stringify(userData));
                }

                // Redirect user based on role
                if (userData.userType === "admin") {
                    navigate("/admin");
                    showNotification("Login Success!", "success");
                } else {
                    navigate("/");
                    showNotification("Login Success!", "success");
                }
            } else {
                showNotification("User data not found in the database!", "error");
            }
        } catch (error) {
            console.error("Login error:", error);
            showNotification("Invalid email or password", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "primary.main",
                p: 2,
            }}
        >
            {/* Banner */}
            <img src="/logo.png" alt="Logo" style={{ width: 100, height: 100 }} />
            <Typography mb={2} variant="h4" fontWeight={700} color="white">
                Bus Pass System
            </Typography>

            {/* Login Form */}
            <Paper elevation={6} sx={{ maxWidth: 400, width: "100%", p: 4, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight={700} textAlign="center" mb={3}>
                    Login
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
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

                    <FormControlLabel
                        control={
                            <Checkbox
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                            />
                        }
                        label={
                            <Typography variant="body2">
                                Remember me
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
                            <CircularProgress size={24} />
                        ) : (
                            "Login"
                        )}
                    </Button>

                    <Typography variant="body2" textAlign="center" mt={2}>
                        Don’t have an account?{" "}
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

export default LoginPage;
