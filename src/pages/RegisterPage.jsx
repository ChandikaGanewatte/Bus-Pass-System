import {createUserWithEmailAndPassword} from "firebase/auth";
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Link, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsChecked: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailPassword(auth,email,password);
            const user=auth.currentUser;
            console.log(user);
            console.log("User Registered Successfully!!");
        }catch (error){
            console.log(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.termsChecked) {
            alert("You must agree to the terms and conditions!");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log(formData);
        // Add your registration logic here
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
                        label="Username"
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
                        onClick={() => navigate()}
                    >
                        Register
                    </Button>

                    <Typography variant="body2" textAlign="center" mt={2}>
                        Already have an account?{" "}
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

export default RegisterPage;
