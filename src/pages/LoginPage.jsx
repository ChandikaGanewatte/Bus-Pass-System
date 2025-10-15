import React, { useState } from "react";
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Link, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        usernameOrEmail: "",
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Add login logic here
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
                Sri Lanka Transport Board
            </Typography>

            {/* Login Form */}
            <Paper elevation={6} sx={{ maxWidth: 400, width: "100%", p: 4, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight={700} textAlign="center" mb={3}>
                    Login
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Username or Email"
                        name="usernameOrEmail"
                        value={formData.usernameOrEmail}
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
                        onClick={() => navigate("/")}
                    >
                        Login
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
