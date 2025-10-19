import React, { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Grid,
    CircularProgress,
} from "@mui/material";

import { db } from "../../firebase/config"; // make sure this is your firebase config
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

const BusPassPage = () => {
    const [pendingPasses, setPendingPasses] = useState([]);
    const [approvedPasses, setApprovedPasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPasses = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) return;

            const q = query(
                collection(db, "applications"),
                where("userId", "==", user.uid)
            );
            const snapshot = await getDocs(q);

            const pending = [];
            const approved = [];

            snapshot.forEach((doc) => {
                const data = doc.data();
                if (data.status === "pending") {
                    pending.push({ id: doc.id, ...data });
                } else if (data.status === "approved") {
                    approved.push({ id: doc.id, ...data });
                }
            });

            setPendingPasses(pending);
            setApprovedPasses(approved);
            setLoading(false);
        };

        fetchPasses();
    }, []);

    const handleDownloadQR = (qrUrl) => {
        const link = document.createElement("a");
        link.href = qrUrl;
        link.download = "bus_pass_qr.png";
        link.click();
    };

    if (loading) {
        return (
            <div className="loading-container">
                <CircularProgress />
                <p>Loading your passes...</p>
            </div>

        );
    }

    return (

        <Box>
            <MenuBar />

            <Box className="buspass-container">
                <Typography variant="h4" className="buspass-title" mb={2}>
                    My Bus Passes
                </Typography>

                {/* Pending Applications */}
                {pendingPasses.length > 0 && (
                    <Box className="pending-section">
                        <Card className="pending-card" sx={{ borderRadius: 3, boxShadow: 1 }}>
                            <CardContent>
                                <Typography variant="h6" className="pending-title">
                                    <span className="pending-dot"></span>
                                    Pending Applications
                                </Typography>

                                <Box className="pending-list">
                                    {pendingPasses.map((pass) => (
                                        <Typography
                                            key={pass.id}
                                            className="pending-item"
                                            variant="body2"
                                        >
                                            📅 Submitted on{" "}
                                            <span className="pending-date">
                                                {pass.appliedAt?.toDate
                                                    ? pass.appliedAt.toDate().toLocaleDateString()
                                                    : "Unknown date"}
                                            </span>{" "}
                                            — Awaiting approval.
                                        </Typography>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                )}

                {/* Approved Passes */}
                <Box className="bus-pass-section">
                    <Typography variant="h5" className="bus-pass-title" mb={2}>
                        Approved Passes
                    </Typography>

                    {approvedPasses.length === 0 ? (
                        <Typography className="no-pass-text">No approved passes yet.</Typography>
                    ) : (
                        <Grid container spacing={3}>
                            {approvedPasses.map((pass) => (
                                <Grid item xs={12} sm={6} md={4} key={pass.id}>
                                    <Card

                                        sx={{
                                            background: 'linear-gradient(135deg, #10b981, #047857)',
                                            borderRadius: 3,
                                            color: 'white',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            // minHeight: 220,
                                            boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
                                            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                                            '&:hover': {
                                                transform: 'translateY(-5px)',
                                                boxShadow: '0 10px 20px rgba(0,0,0,0.25)',
                                            },
                                        }}
                                    >
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
                                                {pass.formData?.name || "Unnamed Pass"}
                                            </Typography>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Route: {pass.formData?.route || "N/A"}
                                            </Typography>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Depot: {pass.formData?.depot || "N/A"}
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontStyle: 'italic', opacity: 0.9 }}>
                                                Expiry Date:{" "}
                                                {pass.expiryDate
                                                    ? new Date(pass.expiryDate.seconds * 1000).toLocaleDateString()
                                                    : "Not available"}
                                            </Typography>
                                        </CardContent>

                                        {pass.qrCodeURL && (
                                            <CardActions className="qr-section">
                                                <img
                                                    src={pass.qrCodeURL}
                                                    alt="QR Code"
                                                    className="qr-image"
                                                />
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    className="download-btn"
                                                    onClick={() => handleDownloadQR(pass.qrCodeURL)}
                                                >
                                                    Download QR Code
                                                </Button>
                                            </CardActions>
                                        )}
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>
            </Box>

            <Footer />
        </Box>

    );
};

export default BusPassPage;
